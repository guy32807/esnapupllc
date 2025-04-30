import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Box, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  onShare: () => void;
  title?: string;
  videoId?: string;
}

const VideoModal: React.FC<VideoModalProps> = ({
  open,
  onClose,
  onShare,
  title = "Discover ESnapup - Innovative Software Solutions",
  videoId = "dQw4w9WgXcQ" // Default placeholder video - replace with your actual video ID
}) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          bgcolor: '#1f2937',
          color: 'white'
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ position: 'relative', paddingTop: '56.25%', width: '100%' }}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title="ESnapup Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 0
            }}
          />
        </Box>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<ShareIcon />}
            onClick={onShare}
            sx={{
              backgroundColor: '#4fd1c5',
              '&:hover': {
                backgroundColor: '#38b2ac'
              }
            }}
          >
            Share This Video
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;