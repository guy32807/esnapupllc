import axios from 'axios';
import { ChatMessage } from './ChatContext';

// IMPORTANT: For security reasons, you should set this as an environment variable
// For development, you can set it in a .env file in the root of your project
// REACT_APP_OPENAI_API_KEY=your-actual-api-key
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

export const getAIResponse = async (userMessage: string, messageHistory: ChatMessage[]): Promise<string> => {
  // If no API key is configured, immediately use fallback responses
  if (!OPENAI_API_KEY || OPENAI_API_KEY === "your-openai-api-key") {
    console.log("No valid API key found, using fallback responses");
    return getFallbackResponse(userMessage);
  }

  try {
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
          ...messageHistory.map(msg => ({
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

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    // Always fall back to predefined responses when API fails
    return getFallbackResponse(userMessage);
  }
};

export const getFallbackResponse = (userMessage: string): string => {
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
    portfolio: ["Check out our portfolio page to see examples of our previous work across different industries.",
               "We've worked with clients in retail, healthcare, finance, and more. Visit our portfolio to see case studies."],
    about: ["ESnapup is a digital agency focused on creating innovative solutions for businesses of all sizes.",
           "We're a team of passionate developers, designers, and marketers dedicated to helping our clients succeed online."],
    default: ["I'm not sure I understand. Could you please provide more details about what you're looking for?",
              "I'd like to help you with that. Could you elaborate a bit more?"]
  };

  const input = userMessage.toLowerCase();
  let category = "default";

  if (input.match(/hi|hello|hey|greetings/i)) category = "greeting";
  else if (input.match(/service|offer|provide|do you/i)) category = "services";
  else if (input.match(/web|website|app|application/i)) category = "web";
  else if (input.match(/mobile|android|ios|iphone|app/i)) category = "mobile";
  else if (input.match(/design|ui|ux|interface|experience/i)) category = "design";
  else if (input.match(/market|seo|content|social media|advertise/i)) category = "marketing";
  else if (input.match(/price|cost|how much|rate|quote|estimate/i)) category = "pricing";
  else if (input.match(/contact|email|phone|reach|talk|get in touch/i)) category = "contact";
  else if (input.match(/portfolio|work|example|project|case|client/i)) category = "portfolio";
  else if (input.match(/about|company|who|when|history|team/i)) category = "about";

  const responses = fallbackResponses[category as keyof typeof fallbackResponses];
  return responses[Math.floor(Math.random() * responses.length)];
};