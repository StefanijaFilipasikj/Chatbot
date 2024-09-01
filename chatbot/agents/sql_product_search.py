from dotenv import load_dotenv

from langchain import hub
from langchain_openai import ChatOpenAI
from langchain.prompts.prompt import PromptTemplate
from langchain.agents import (
    create_react_agent,
    AgentExecutor
)
from langchain.tools import tool

from tools.tools import execute_sql_query
from utils.utils import table_description

load_dotenv()

@tool
def run_sql_agent(question: str):
    """Agent for getting data from relational database based on a user question"""
    llm = ChatOpenAI(temperature=0, model="gpt-4o-mini")

    template = """given the question create a sql query based on the table schemas given and give me the results.
    If you get no results by searching in the title, search in the category.
    Don't ignore the details of the product. Try to use all information given by the user.
    Try to find the relevant description name and value of the product when needed.
    Never query all columns only relevant ones. Awlays limit the result to 5. 
    Awlays use LIKE when searching on text and AWLAYS strip the word of any spaces, symbols or uneccesary characters. AWLAYS query with upper case transformation.
    UPPER(COL_NAME) LIKE UPPER('%PriceOrder%')
    Example:
    Question: Any laptops with rtx 4060?
    Query: SELECT title FROM product WHERE UPPER(category) LIKE UPPER('%LAPTOP%') AND UPPER(title) LIKE UPPER('%RTX%') AND UPPER(title) LIKE UPPER('%4060%') LIMIT 5
    
    Schema: {table_schemas}
    Question: {question}"""

    table_schema = table_description

    prompt_template = PromptTemplate(template=template, input_variables=["question", "table_schemas"])

    tools_for_agent = [
        execute_sql_query
    ]

    react_prompt = hub.pull("hwchase17/react")
    agent = create_react_agent(llm=llm, tools=tools_for_agent, prompt=react_prompt)
    agent_executor = AgentExecutor(agent=agent, tools=tools_for_agent, verbose=True)

    try:
        result = agent_executor.invoke(
            input={"input": prompt_template.format_prompt(question=question, table_schemas=table_schema)}
        )
        output = result["output"]
    except Exception as e:
        pass
        output = str(e)

    return output