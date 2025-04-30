import React from 'react';
import { Paper, Typography, ListItem } from '@mui/material';
import { ChatMessage } from './ChatContext';

interface ChatMessageItemProps {
  message: ChatMessage;
}

const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ message }) => {
  return (
    <ListItem
      sx={{
        justifyContent: message.isUser ? 'flex-end' : 'flex-start',
        mb: 1,
        padding: 0
      }}
    >
      <Paper
        elevation={1}
        sx={{
          p: 1.5,
          maxWidth: '80%',
          bgcolor: message.isUser ? 'primary.light' : 'grey.100',
          color: message.isUser ? 'white' : 'text.primary',
          borderRadius: message.isUser ? '15px 15px 0 15px' : '15px 15px 15px 0'
        }}
      >
        <Typography variant="body2">{message.text}</Typography>
      </Paper>
    </ListItem>
  );
};

export default ChatMessageItem;