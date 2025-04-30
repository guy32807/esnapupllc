import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import RedditIcon from '@mui/icons-material/Reddit';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import VideoModal from './VideoModal';

interface SocialShareProps {
  url?: string;
  title?: string;
  description?: string;
  hashtags?: string[];
  iconColor?: string;
  hoverColor?: string;
  size?: 'small' | 'medium' | 'large';
  videoId?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({
  url = window.location.href,
  title = 'Check out ESnapup - Innovative Software Solutions',
  description = 'ESnapup provides cutting-edge software development services to transform your business ideas into powerful digital solutions.',
  hashtags = ['ESnapup', 'SoftwareDevelopment', 'Innovation'],
  iconColor = '#cbd5e0',
  hoverColor = '#4fd1c5',
  size = 'small',
  videoId = 'dQw4w9WgXcQ' // Replace with your actual video ID
}) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const encodedHashtags = hashtags.join(',');

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${encodedHashtags}`, '_blank');
  };

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank');
  };

  const shareToPinterest = () => {
    window.open(`https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedDescription}`, '_blank');
  };

  const shareToReddit = () => {
    window.open(`https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`, '_blank');
  };

  const shareToTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`, '_blank');
  };

  const shareToWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodedTitle} ${encodedUrl}`, '_blank');
  };

  // For Instagram, direct to profile page since direct sharing isn't easily supported
  const openInstagram = () => {
    window.open('https://www.instagram.com/esnapup', '_blank');
  };

  // Open video modal instead of just going to YouTube channel
  const handleYouTubeClick = () => {
    setVideoModalOpen(true);
  };

  // Share YouTube video
  const shareYouTubeVideo = () => {
    const youtubeUrl = encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${youtubeUrl}`, '_blank');
  };

  const iconStyle = {
    color: iconColor,
    '&:hover': { 
      color: hoverColor,
      transform: 'translateY(-3px)',
    },
    transition: 'all 0.3s ease',
    margin: '0 4px',
  };

  return (
    <>
      <Tooltip title="Share on Facebook">
        <IconButton 
          aria-label="share on facebook" 
          size={size}
          onClick={shareToFacebook}
          sx={iconStyle}
        >
          <FacebookIcon />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Share on Twitter">
        <IconButton 
          aria-label="share on twitter" 
          size={size}
          onClick={shareToTwitter}
          sx={iconStyle}
        >
          <TwitterIcon />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Share on LinkedIn">
        <IconButton 
          aria-label="share on linkedin" 
          size={size}
          onClick={shareToLinkedIn}
          sx={iconStyle}
        >
          <LinkedInIcon />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Visit our Instagram">
        <IconButton 
          aria-label="visit instagram" 
          size={size}
          onClick={openInstagram}
          sx={iconStyle}
        >
          <InstagramIcon />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Share on Pinterest">
        <IconButton 
          aria-label="share on pinterest" 
          size={size}
          onClick={shareToPinterest}
          sx={iconStyle}
        >
          <PinterestIcon />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Share on Reddit">
        <IconButton 
          aria-label="share on reddit" 
          size={size}
          onClick={shareToReddit}
          sx={iconStyle}
        >
          <RedditIcon />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Watch and share our video">
        <IconButton 
          aria-label="watch our video" 
          size={size}
          onClick={handleYouTubeClick}
          sx={{
            ...iconStyle,
            color: hoverColor, // Highlight this icon
            '&:hover': { 
              color: hoverColor,
              transform: 'translateY(-3px) scale(1.1)',
            },
          }}
        >
          <YouTubeIcon />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Share on Telegram">
        <IconButton 
          aria-label="share on telegram" 
          size={size}
          onClick={shareToTelegram}
          sx={iconStyle}
        >
          <TelegramIcon />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Share on WhatsApp">
        <IconButton 
          aria-label="share on whatsapp" 
          size={size}
          onClick={shareToWhatsApp}
          sx={iconStyle}
        >
          <WhatsAppIcon />
        </IconButton>
      </Tooltip>

      {/* Video Modal */}
      <VideoModal 
        open={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        onShare={shareYouTubeVideo}
        videoId={videoId}
      />
    </>
  );
};

export default SocialShare;