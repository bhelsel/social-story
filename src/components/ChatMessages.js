// import React, { useState, useEffect, useRef } from "react";
// import { Send, FileText,  } from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FileText, Send } from "lucide-react";
import classes from "./ChatMessages.module.css";
import chatQuestions from "../data/chatQuestions.json";
import MessageBubble from "./ChatMessagesBubbles.js";
import callGeminiAPI from "../services/geminiService.js";
import studies from "../data/studies.json";
import { createSystemContext } from "../utils/protocolLoader.js";

function ResearchProtocolChat() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [protocolContext, setProtocolContext] = useState(null);
  const [isProtocolLoaded, setIsProtocolLoaded] = useState(false);
  const hasInitialized = useRef(false);

  const { studyId } = useParams();

  const study = studies.find((s) => s.id === studyId);

  function addMessage(content, sender, isMarkdown = false) {
    const newMessage = {
      id: Date.now() + Math.random(),
      content,
      sender,
      isMarkdown,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  }

  async function sendMessage(messageOverride = null) {
    const messageText = messageOverride || userInput.trim();
    if (!messageText || !isProtocolLoaded) return;
    // Add user message
    addMessage(messageText, "user");
    setUserInput("");
    setIsLoading(true);
    try {
      const result = await callGeminiAPI(
        `${protocolContext}\n${messageText}`,
        "gemini-1.5-flash"
      );
      addMessage(result.response, "model", true);
    } catch (error) {
      console.error("Error sending message:", error);
      addMessage("Error: Failed to get response. Please try again.", "model");
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyPress(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const protocolName = `${study.id}.txt`; // Example protocol file name
  console.log("Protocol Name:", protocolName);

  useEffect(() => {
    async function loadProtocol(filename) {
      setIsLoading(true);
      try {
        const context = await createSystemContext(filename);
        if (context) {
          setProtocolContext(context);
          setIsProtocolLoaded(true);
        } else {
          addMessage("Error loading protocol.", "model", true);
        }
      } catch (error) {
        console.error("Error loading protocol:", error);
        addMessage(`Error loading protocol: ${error.message}`, "model", true);
      } finally {
        setIsLoading(false);
      }
    }

    if (!hasInitialized.current) {
      const firstMessage = `**Hello! I'm your virtual research assistant.**
      
      I'm here to help you digest the research protocol for the ${study.id} study. I want to make sure you understand everything before deciding to join the study. I can help you learn about the assessments and what will happen if you join the study.
      
      What questions do you have about the ${study.id} study? You can type your answer or use one of the quick buttons. If I'm not sure about something, I'll tell you to ask the study team.`;

      addMessage(firstMessage, "model", true);
      loadProtocol(protocolName);
      hasInitialized.current = true;
    }
  }, []);

  const quickQuestions = chatQuestions;

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <div className={classes.headerContent}>
          <FileText className={classes.iconLarge} />
          <h1 className={classes.headerTitle}>My Virtual Research Assistant</h1>
        </div>
        <p className={classes.headerSubtitle}>
          A Google Gemini AI-powered Summary of Research Protocols for People
          with Intellectual and Developmental Disabilities.
        </p>
      </header>
      <main className={classes.main}>
        <div className={classes.chatContainer}>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
      </main>
      {/* Input Area */}
      <div className={classes.inputContainer}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask about study design, participants, methodology, or any protocol details..."
          className={classes.textInput}
          disabled={!isProtocolLoaded || isLoading}
        />
        <button
          onClick={() => sendMessage()}
          // disabled={!isProtocolLoaded || isLoading}
          className={classes.sendButton}
        >
          <Send className={classes.iconSend} />
          Send
        </button>
      </div>
      {/* Quick Question Buttons */}
      {isProtocolLoaded && (
        <div className={classes.quickButtonsContainer}>
          {quickQuestions.map((item, index) => (
            <button
              key={index}
              onClick={() => sendMessage(item.question)}
              disabled={isLoading}
              className={`${classes.quickButton} ${classes[item.colorClass]}`}
            >
              {item.text}
            </button>
          ))}
        </div>
      )}
      {/* Footer */}
      <div className={classes.footer}>
        Questions answered by AI about the research protocol may be wrong.
        Please verify important details from the {study.id} study with{" "}
        <a
          href={`mailto:${study.coordinator.email}`}
          className={classes.footerLink}
        >
          {study.coordinator.name}
        </a>
        , our {study.id} study coordinator.
      </div>
    </div>
  );
}
export default ResearchProtocolChat;

// return (
//     <div className={classes.container}>
//       {/* Header */}
//       {isHeaderVisible && (
//         <header className={classes.header}>
//           <div className={classes.headerContent}>
//             <FileText className={classes.iconLarge} />
//             <h1 className={classes.headerTitle}>Research Protocol Assistant</h1>
//           </div>
//           <p className={classes.headerSubtitle}>
//             AI-powered analysis of research protocols.
//           </p>
//         </header>
//       )}
//       {/* Main Chat Area */}
//       <main className={classes.main}>
//         {/* Messages Container */}
//         <div ref={chatMessagesRef} className={classes.chatContainer}>
//           {messages.map((message) => (
//             <MessageBubble key={message.id} message={message} />
//           ))}
//         </div>
//         {/* Loading Indicator */}
//         {isLoading && (
//           <div className={classes.loadingOverlay}>
//             <div className={classes.loadingContent}>
//               <div className={classes.loadingSpinner}></div>
//               <p className={classes.loadingText}>Analyzing protocol...</p>
//             </div>
//           </div>
//         )}
//         {/* Input Area */}
//         <div className={classes.inputContainer}>
//           <input
//             type="text"
//             value={userInput}
//             onChange={(e) => setUserInput(e.target.value)}
//             onKeyPress={handleKeyPress}
//             placeholder="Ask about study design, participants, methodology, or any protocol details..."
//             className={classes.textInput}
//             disabled={!isProtocolLoaded || isLoading}
//           />
//           <button
//             onClick={() => sendMessage()}
//             disabled={!isProtocolLoaded || isLoading}
//             className={classes.sendButton}
//           >
//             <Send className={classes.iconSend} />
//             Send
//           </button>
//         </div>
//         {/* Quick Question Buttons */}
//         {isProtocolLoaded && (
//           <div className={classes.quickButtonsContainer}>
//             {quickQuestions.map((item, index) => (
//               <button
//                 key={index}
//                 onClick={() => sendMessage(item.question)}
//                 disabled={isLoading}
//                 className={`${classes.quickButton} ${classes[item.colorClass]}`}
//               >
//                 {item.text}
//               </button>
//             ))}
//           </div>
//         )}
//       </main>
//       {/* Footer */}
//       <div className={classes.footer}>
//         AI analysis for research protocols. Always verify important details with
//         original documents.
//         <span> • </span>
//         <a href="https://www.google.com" className={classes.footerLink}>
//           Privacy Policy
//         </a>
//         <span> • </span>
//         <a href="https://www.google.com" className={classes.footerLink}>
//           Contact
//         </a>
//       </div>
//     </div>

//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   //const [protocolContent, setProtocolContent] = useState("");
//   const [isProtocolLoaded, setIsProtocolLoaded] = useState(false);
//   const [isHeaderVisible, setIsHeaderVisible] = useState(true);
//   const chatMessagesRef = useRef(null);
//   // Quick question buttons for research protocols
//   const quickQuestions = chatQuestions;
//   // Scroll to bottom when new messages are added
//   useEffect(() => {
//     if (chatMessagesRef.current) {
//       chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
//     }
//   }, [messages]);
//   const addMessage = (content, sender, isMarkdown = false) => {
//     const newMessage = {
//       id: Date.now() + Math.random(),
//       content,
//       sender,
//       isMarkdown,
//       timestamp: new Date(),
//     };
//     setMessages((prev) => [...prev, newMessage]);
//   };
//   const protocol = "../protocols/SPARTANS.txt";
//   const loadProtocol = async () => {
//     try {
//       // Initial summary while loading
//       const initialSummary = `**Research Protocol Analysis System**
// I'm ready to help you understand and analyze research protocols.`;
//       addMessage(initialSummary, "model", true);
//       // Simulate loading a protocol (replace with actual file upload/URL fetch)
//       const sampleProtocol = SpartansProtocol;
//       // setProtocolContent(sampleProtocol);
//       setIsProtocolLoaded(true);
//       addMessage(
//         "Research protocol loaded successfully. You can now ask questions about the SPARTANS study.",
//         "model"
//       );
//       addMessage(sampleProtocol);
//     } catch (error) {
//       console.error("Error loading protocol:", error);
//       addMessage(
//         `Error loading protocol: ${error.message}. Please try again.`,
//         "model"
//       );
//     }
//   };
//   // Load protocol on component mount
//   useEffect(() => {
//     loadProtocol();
//   }, []);
//   const sendMessage = async (messageOverride = null) => {
//     const messageText = messageOverride || userInput.trim();
//     if (!messageText || !isProtocolLoaded) return;
//     // Hide header after first message
//     if (isHeaderVisible) {
//       setIsHeaderVisible(false);
//     }
//     // Add user message
//     addMessage(messageText, "user");
//     setUserInput("");
//     setIsLoading(true);
//     try {
//       // Simulate API call to Google Gemini
//       // Replace this with actual API integration
//       // Mock response based on the question
//       let response = generateMockResponse(messageText);
//       addMessage(response, "model", true);
//     } catch (error) {
//       console.error("Error sending message:", error);
//       addMessage("Error: Failed to get response. Please try again.", "model");
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const generateMockResponse = (question) => {
//     const lowerQuestion = question.toLowerCase();
//     return lowerQuestion;
//   };
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };
