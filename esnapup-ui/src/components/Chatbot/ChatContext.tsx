import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';

// Define message types
export interface ChatMessage {
  text: string;
  isUser: boolean;
}

// Define context type
interface ChatContextType {
  messages: ChatMessage[];
  isLoading: boolean;
  sendMessage: (message: string) => void;
  clearMessages: () => void;
}

// Create the context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// OpenAI API key - In a real app, this should be in an environment variable
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY || "your-openai-api-key";

// Provider component
export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: "👋 Hi there! I'm ESnapup's AI assistant. How can I help you today?", isUser: false }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const generateAIResponse = async (userMessage: string) => {
    setIsLoading(true);

    try {
      let aiResponse = "";

      try {
        // Try to use OpenAI API
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: `You are a helpful assistant for ESnapup, a company that offers web development, 
                mobile app development, UI/UX design, and digital marketing services. Be concise but friendly
                and helpful. Focus on providing accurate information about the company's services.`
              },
              ...messages.map(msg => ({
                role: msg.isUser ? "user" : "assistant",
                content: msg.text
              })),
              { role: "user", content: userMessage }
            ],
            max_tokens: 150,
            temperature: 0.7,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${OPENAI_API_KEY}`
            }
          }
        );

        aiResponse = response.data.choices[0].message.content.trim();
      } catch (error) {
        console.error("Error calling OpenAI API:", error);
        // Fallback to predefined responses
        aiResponse = getFallbackResponse(userMessage, messages);
      }

      setMessages(prev => [...prev, { text: aiResponse, isUser: false }]);
    } catch (error) {
      console.error("Error in AI response generation:", error);
      setMessages(prev => [...prev, { 
        text: "I'm having trouble connecting right now. Please try again later or contact us directly.", 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = (message: string) => {
    if (message.trim() === '') return;
    
    setMessages(prev => [...prev, { text: message, isUser: true }]);
    generateAIResponse(message);
  };

  const clearMessages = () => {
    setMessages([
      { text: "👋 Hi there! I'm ESnapup's AI assistant. How can I help you today?", isUser: false }
    ]);
  };

  return (
    <ChatContext.Provider value={{ messages, isLoading, sendMessage, clearMessages }}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use the chat context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

// Helper function for fallback responses
const getFallbackResponse = (userMessage: string, previousMessages: ChatMessage[]): string => {
  const fallbackResponses = {
    greeting: ["Hello! How can I assist you with ESnapup's services today?", 
               "Hi there! I'm here to help with any questions about our digital solutions."],
    services: ["We offer web development, mobile app development, UI/UX design, and digital marketing services. What are you interested in?",
              "Our services include custom web applications, mobile apps, UI/UX design, and strategic digital marketing."],
    web: ["Our web development team creates responsive, scalable websites and web applications tailored to your business needs.",
          "We specialize in creating modern web applications using technologies like React, Angular, and Node.js."],
    mobile: ["We develop native and cross-platform mobile apps for iOS and Android that deliver exceptional user experiences.",
            "Our mobile app development includes everything from concept to deployment on the App Store and Google Play."],
    design: ["Our UI/UX designers create intuitive, engaging interfaces that delight users and achieve business goals.",
            "Good design is at the heart of everything we do. Our design process focuses on creating beautiful, functional interfaces."],
    marketing: ["Our digital marketing strategies help increase your online visibility and drive conversions.",
               "We offer SEO, content marketing, social media management, and PPC campaigns to boost your online presence."],
    pricing: ["Our pricing depends on project scope and requirements. We'd be happy to provide a customized quote.",
             "We offer competitive pricing based on project complexity. Contact us for a detailed estimate."],
    contact: ["You can reach us at contact@esnapup.com or through our contact form on the website.",
             "Feel free to contact us via email, phone, or the contact form on our website for more information."],
    portfolio: ["Our portfolio showcases successful projects across various industries. Check out our Portfolio page to see examples of our work.",
               "We've worked with startups, SMEs, and large enterprises across many sectors. View our Portfolio page for case studies."],
    process: ["Our development process includes discovery, planning, design, development, testing, and deployment phases.",
             "We follow an agile methodology to ensure continuous delivery and regular feedback throughout the project."],
    timeline: ["Project timelines vary based on complexity. We can provide an estimated timeline after understanding your requirements.",
              "Most web projects take 6-12 weeks, but this varies based on scope and complexity."],
    default: ["I'm not sure I understand. Could you please provide more details about what you're looking for?",
              "I'd like to help you with that. Could you elaborate a bit more?"]
  };

  const input = userMessage.toLowerCase();
  let category = "default";

  if (input.match(/hi|hello|hey/)) category = "greeting";
  else if (input.match(/service|offer|provide/)) category = "services";
  else if (input.match(/web|website|app/)) category = "web";
  else if (input.match(/mobile|android|ios|iphone/)) category = "mobile";
  else if (input.match(/design|ui|ux/)) category = "design";
  else if (input.match(/market|seo|content|social media/)) category = "marketing";
  else if (input.match(/price|cost|how much|rate/)) category = "pricing";
  else if (input.match(/contact|email|phone|reach|talk/)) category = "contact";
  else if (input.match(/portfolio|work|example|project/)) category = "portfolio";
  else if (input.match(/process|methodology|approach/)) category = "process";
  else if (input.match(/time|timeline|deadline|duration/)) category = "timeline";

  const responses = fallbackResponses[category as keyof typeof fallbackResponses];
  return responses[Math.floor(Math.random() * responses.length)];
};