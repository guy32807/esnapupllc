import React, { useState } from 'react';
import { Fab, Box } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import ChatWindow from './ChatWindow';
import { ChatProvider } from './ChatContext';

const SimpleChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ChatProvider>
      <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>
        <Fab 
          color="primary" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? <CloseIcon /> : <ChatIcon />}
        </Fab>
      </Box>
      
      <ChatWindow isOpen={isOpen} />
    </ChatProvider>
  );
};

export default SimpleChatbot;