import React from 'react';
import { Box, Paper, Typography, List, Divider, CircularProgress } from '@mui/material';
import ChatMessageItem from './ChatMessageItem';
import ChatInput from './ChatInput';
import { useChat } from './ChatContext';

interface ChatWindowProps {
  isOpen: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen }) => {
  const { messages, isLoading } = useChat();

  if (!isOpen) return null;

  return (
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
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column'
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
        <Typography variant="h6">ESnapup AI Assistant</Typography>
      </Box>
      
      <List sx={{ 
        flexGrow: 1, 
        overflow: 'auto',
        p: 2
      }}>
        {messages.map((message, index) => (
          <ChatMessageItem key={index} message={message} />
        ))}
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
      </List>
      
      <Divider />
      
      <ChatInput />
    </Paper>
  );
};

export default ChatWindow;