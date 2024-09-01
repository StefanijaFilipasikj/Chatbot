import React, { useEffect, useState, useRef } from "react";
import ChatbotService from "../../repository/ChatbotRepository";
import "./Chatbot.css"

export default function Chatbot(props) {
    const [messages, setMessages] = useState([])
    const [streamingMessage, setStreamingMessage] = useState("")
    const [query, setQuery] = useState("")
    
    let isLoading = useRef(false);
    let messageForDatabase = useRef("");

    useEffect(() => {
        loadMessages();
    }, []);

    const handleChange = (e) => {
        setQuery(e.target.value);
    }

    const loadMessages = (e) => {
        ChatbotService.getMessagesByUser()
            .then((data) => {
                setMessages(data.data)
                console.log(data.data)
            }).catch((error) => {
                console.log(error)
            });
    }

    const resetChat = (e) => {
        ChatbotService.deleteMessagesByUser()
            .then(() => loadMessages())
            .catch((error) => {
                console.log(error)
            });
    }

    const addMessage = (query, role) => {
        setMessages(messages => [...messages, {content: query, role: role}])
        ChatbotService.addMessage(query, role)
        .then(() => {})
            .catch((error) => {
                console.log(error)
            });
    }

    function onFormSubmit(e) {
        e.preventDefault();
        addMessage(query, "user");
        
        const url = `http://127.0.0.1:8000/chat`;
        isLoading.current = true;
        fetch(url, {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({messages: [...messages, {content: query, role: "user"}].map((msg) => ({ content: msg.content, role: msg.role }))})
        })
        .then(response => {
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            isLoading.current = false

            function readStream() {
                return reader.read().then(({ done, value }) => {
                    if (done) {
                        addMessage(messageForDatabase.current, "assisstant");
                        setStreamingMessage("");
                        messageForDatabase.current = "";
                        return; // End of stream
                    }
                    
                    // Decode and print the chunk
                    const chunk = decoder.decode(value, { stream: true });
                    messageForDatabase.current += chunk;
                    setStreamingMessage(message => message + chunk);
                    return readStream(); // Continue reading
                });
            }
            
            return readStream();
        })
        .catch(error => {
            console.error('Error:', error);
        });

        setQuery("");
    }
    
    return (<div className="container">
        <div >
            {messages && messages.map((m) => m.role === "user" ? <div className="stringContent text-end">{m.content}</div> : <div className="stringContent text-start">{m.content}</div>)}
            <span className="stringContent text-start">{streamingMessage}</span>
            {isLoading.current && <span>Loading...</span>}
        </div>
        <button className="btn btn-primary" onClick={resetChat}>Reset chat</button>
        <form onSubmit={onFormSubmit}>
            <div className="form-group mb-3">
                <input className="form-control" type="text" id="content" name="content" required placeholder="Enter content" value={query} onChange={handleChange} />
            </div>
        </form>
    </div>
    )
}