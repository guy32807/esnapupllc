import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useChat } from './ChatContext';

const ChatInput: React.FC = () => {
  const [input, setInput] = useState('');
  const { sendMessage } = useChat();

  const handleSend = () => {
    if (input.trim() === '') return;
    sendMessage(input);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <Box sx={{ 
      p: 2, 
      display: 'flex',
      alignItems: 'center'
    }}>
      <TextField
        fullWidth
        size="small"
        placeholder="Type a message..."
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Button 
        sx={{ ml: 1 }}
        variant="contained" 
        color="primary"
        onClick={handleSend}
      >
        <SendIcon />
      </Button>
    </Box>
  );
};

export default ChatInput;