import React, { useEffect, useState, useRef } from "react";
import ChatbotService from "../../repository/ChatbotRepository";
import "./Chatbot.css";
import chatbot from "../../images/chatbot.png";
import user from "../../images/user.png";

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
    
    return (
        <>
            <div className="container my-4">

                {messages.length > 0 && (
                    <div className="position-fixed fixed-top reset-chat w-100">
                        <button className="btn btn-warning px-5 py-2 text-white fs-5 rounded-5" onClick={resetChat}>Reset chat</button>
                    </div>
                )}
                {messages.length === 0 && (
                    <div className="text-center mt-4">
                        <img className="chatbot-logo" src={chatbot} alt="chatbot"/>
                        <h1 className="text-info">Ask Me Anything</h1>
                    </div>
                )}

                <div>
                    {messages && messages.map(
                        (m) => m.role === "user" ?
                            <div className="w-100 d-flex justify-content-end m-4 me-0 position-relative">
                                <div className="user stringContent alert alert-info rounded-5 w-75 fs-5 px-4">{m.content}</div>
                                <img className="user-img align-self-end ms-2" src={user} alt="user"/>
                            </div>
                            :
                            <div className="w-100 d-flex justify-content-start m-4 ms-0 position-relative">
                                <img className="chatbot-img align-self-end me-2" src={chatbot} alt="chatbot"/>
                                <div className="chatbot stringContent alert alert-light rounded-5 w-75 fs-5 px-4">{m.content}</div>
                            </div>
                        )
                    }
                    <span className="stringContent text-start">{streamingMessage}</span>
                    {isLoading.current &&
                        <div className="w-25 d-flex justify-content-start m-4">
                            <img className="chatbot-img align-self-end me-2" src={chatbot} alt="chatbot"/>
                            <div className="chatbot stringContent alert alert-light rounded-5 w-75 fs-5 px-4">Loading...</div>
                        </div>
                    }
                </div>
                <form className="question-input position-fixed fixed-bottom w-75" onSubmit={onFormSubmit}>
                    <div className="form-group mb-3 position-relative">
                        <input className="form-control rounded-5 fs-5 py-3 px-4" type="text" id="content" name="content" required placeholder="Enter content" value={query} onChange={handleChange} />
                        <button className="btn-send" onClick={onFormSubmit}><span className="fa fa-paper-plane fs-3"></span></button>
                    </div>
                </form>
            </div>
            <br/><br/><br/><br/>
        </>
    )
}