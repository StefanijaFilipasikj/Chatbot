from agents.sql_product_search import run_sql_agent
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from langchain_openai import ChatOpenAI

from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from threading import Thread
from queue import Queue
from typing import List
 
from langchain.callbacks.base import BaseCallbackHandler   
from langchain.schema import LLMResult  
from typing import Dict, List, Any

class Message(BaseModel):
    content: str
    role: str

class MessagesList(BaseModel):
    messages: List[Message]

class MyCustomHandler(BaseCallbackHandler):  
    def __init__(self, queue) -> None:  
        super().__init__()   
        self._queue = queue  
        self._stop_signal = None  
        print("Custom handler Initialized")  

    def on_llm_new_token(self, token: str, **kwargs) -> None:  
        self._queue.put(token)  
   
    def on_llm_start( self, serialized: Dict[str, Any], prompts: List[str], **kwargs: Any ) -> None:  
        """Run when LLM starts running."""  
        print("generation started")  
  
    def on_llm_end(self, response: LLMResult, **kwargs: Any) -> None:  
        """Run when LLM ends running."""  
        print("\n\ngeneration concluded")  
        self._queue.put(self._stop_signal)

app = FastAPI()
streamer_queue = Queue()
stream_it = MyCustomHandler(streamer_queue) 
llm_for_tool_use = ChatOpenAI(temperature=0, model="gpt-4o-mini")
llm = ChatOpenAI(temperature=0, model="gpt-4o-mini", callbacks=[stream_it], streaming=True)
tools = [run_sql_agent] 
llm_with_tools = llm_for_tool_use.bind_tools(tools)

def generate(chat_messages: MessagesList): 

    messages = [
        SystemMessage(content="You are very powerful product recomendation system. Don't recomend products from your knowledge, only from the tool results.")
    ]

    for msg in chat_messages.messages:
        if msg.role == "user":
            messages.append(HumanMessage(content=msg.content))
        if msg.role == "assisstant":
            messages.append(AIMessage(content=msg.content))

    ai_msg = llm_with_tools.invoke(messages) 

    if ai_msg.tool_calls:
        messages.append(ai_msg)
        selected_tool = {'run_sql_agent': run_sql_agent}[ai_msg.tool_calls[0]["name"].lower()]
        tool_msg = selected_tool.invoke(ai_msg.tool_calls[0])
        messages.append(tool_msg)

    llm.invoke(messages)  
  
def start_generation(messages):  
    thread = Thread(target=generate, kwargs={"chat_messages": messages})  
    thread.start()

async def response_generator(messages):  
    start_generation(messages)  
   
    while True:  
        value = streamer_queue.get()   
        if value == None:  
            break  
        yield value   
        streamer_queue.task_done()

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat(messages: MessagesList):
    return StreamingResponse(response_generator(messages), media_type='text/event-stream')

@app.get("/health")
async def health():
    """Check the api is running"""
    return {"status": "🤙"}

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="localhost",
        port=8000,
        reload=True
    )