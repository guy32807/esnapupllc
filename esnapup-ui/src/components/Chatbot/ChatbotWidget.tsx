import React, { useState } from 'react';
import { 
  MainContainer, 
  ChatContainer, 
  MessageList, 
  Message, 
  MessageInput, 
  TypingIndicator 
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { Fab, Box, Paper, Typography } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import { findResponse } from './botResponses';
import chatbotAnalytics from './ChatbotAnalytics';

interface ChatMessage {
  message: string;
  sentTime: string;
  sender: string;
  direction: 'incoming' | 'outgoing';
}

const initialMessages: ChatMessage[] = [
  {
    message: "👋 Hi there! Welcome to ESnapup! How can I help you today?",
    sentTime: new Date().toLocaleTimeString(),
    sender: "ESnapup Assistant",
    direction: "incoming"
  }
];

const ChatbotWidget: React.FC = () => {
  console.log("ChatbotWidget rendering"); // Add this line
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (message: string) => {
    const newMessage: ChatMessage = {
      message,
      sentTime: new Date().toLocaleTimeString(),
      sender: "User",
      direction: "outgoing"
    };
    
    setMessages((prev) => [...prev, newMessage]);
    
    // Simulate typing indicator
    setIsTyping(true);
    
    // Process the message and respond (simulated for now)
    setTimeout(() => {
      processMessage(message);
    }, 1000);
  };

  const processMessage = (message: string) => {
    // Get response from our utility
    const response = findResponse(message);
    
    // Track the interaction
    chatbotAnalytics.trackInteraction(message, response);
    
    const botResponse: ChatMessage = {
      message: response,
      sentTime: new Date().toLocaleTimeString(),
      sender: "ESnapup Assistant",
      direction: "incoming"
    };
    
    setIsTyping(false);
    setMessages((prev) => [...prev, botResponse]);
  };

  return (
    <>
      {/* Chat button */}
      <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>
        <Fab 
          color="primary" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? <CloseIcon /> : <ChatIcon />}
        </Fab>
      </Box>
      
      {/* Chat window */}
      {isOpen && (
        <Paper
          elevation={3}
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 20,
            width: 320,
            height: 450,
            overflow: 'hidden',
            zIndex: 9999,
            borderRadius: 2
          }}
        >
          <Box sx={{ 
            bgcolor: 'primary.main', 
            color: 'white', 
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography variant="h6">ESnapup Assistant</Typography>
          </Box>
          <MainContainer>
            <ChatContainer>
              <MessageList
                typingIndicator={isTyping ? <TypingIndicator content="ESnapup Assistant is typing" /> : null}
              >
                {messages.map((message, index) => (
                  <Message 
                    key={index} 
                    model={{
                      message: message.message,
                      sentTime: message.sentTime,
                      sender: message.sender,
                      direction: message.direction,
                      position: "normal"
                    }} 
                  />
                ))}
              </MessageList>
              <MessageInput 
                placeholder="Type your message here..." 
                onSend={handleSend} 
                attachButton={false}
              />
            </ChatContainer>
          </MainContainer>
        </Paper>
      )}
    </>
  );
};

export default ChatbotWidget;