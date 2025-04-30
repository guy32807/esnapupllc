interface BotResponse {
  patterns: string[];
  responses: string[];
}

export const botResponses: BotResponse[] = [
  {
    patterns: ["hello", "hi", "hey", "greetings"],
    responses: [
      "Hello! How can I assist you with ESnapup's services today?",
      "Hi there! What brings you to ESnapup?",
      "Hey! I'm ESnapup's virtual assistant. How can I help you?"
    ]
  },
  {
    patterns: ["service", "services", "offer", "provides"],
    responses: [
      "We offer web development, mobile apps, UI/UX design, e-commerce solutions, and consulting services. What are you interested in?",
      "ESnapup specializes in digital solutions including web development, mobile apps, UI/UX design, e-commerce, and business consulting. Would you like to know more about any specific service?"
    ]
  },
  {
    patterns: ["web", "website", "web development"],
    responses: [
      "Our web development services include responsive websites, web applications, and custom CMS solutions. We work with modern frameworks like React, Angular, and Vue.",
      "We build beautiful, functional websites that work across all devices. Our developers use cutting-edge technologies to ensure your site is fast, secure, and scalable."
    ]
  },
  {
    patterns: ["mobile", "app", "application"],
    responses: [
      "We develop native and cross-platform mobile apps for iOS and Android. Our apps are built with performance and user experience in mind.",
      "Our mobile app development services include concept development, UI/UX design, development, testing, and deployment to app stores."
    ]
  },
  {
    patterns: ["design", "ui", "ux", "user interface", "user experience"],
    responses: [
      "Our UI/UX design process focuses on creating intuitive, engaging interfaces that delight users while meeting business objectives.",
      "We create beautiful designs that enhance usability and create memorable user experiences. Our designs are research-driven and user-centered."
    ]
  },
  {
    patterns: ["ecommerce", "e-commerce", "online store", "shop"],
    responses: [
      "We build e-commerce solutions using platforms like Shopify, WooCommerce, and custom solutions. Our stores are optimized for conversions and easy management.",
      "Our e-commerce expertise includes online store setup, payment gateway integration, inventory management, and marketing optimization."
    ]
  },
  {
    patterns: ["consult", "consulting", "advice", "strategy"],
    responses: [
      "Our consulting services help businesses identify digital opportunities, optimize operations, and implement effective technology strategies.",
      "We provide strategic consulting to help your business make the most of digital technologies. We can help with digital transformation, technology assessment, and roadmap planning."
    ]
  },
  {
    patterns: ["price", "pricing", "cost", "quote", "estimate"],
    responses: [
      "Our pricing depends on the specific requirements of your project. Would you like to schedule a consultation to discuss your needs?",
      "We provide custom quotes based on project scope, timeline, and requirements. Let's set up a call to discuss your project in detail."
    ]
  },
  {
    patterns: ["contact", "reach", "email", "phone", "talk", "call"],
    responses: [
      "You can reach us through our contact form on the website, or email us directly at contact@esnapup.com.",
      "Feel free to contact us via the Contact page, or call us at (123) 456-7890. We're available Monday through Friday, 9 AM to 5 PM EST."
    ]
  },
  {
    patterns: ["portfolio", "work", "example", "project", "previous"],
    responses: [
      "You can check out our portfolio on the Portfolio page. We've worked with various businesses across different industries.",
      "Our portfolio showcases our best work in web development, mobile apps, and design. You can filter by industry or service type to find relevant examples."
    ]
  },
  {
    patterns: ["time", "timeline", "duration", "how long"],
    responses: [
      "Project timelines vary based on complexity and scope. A simple website might take 4-6 weeks, while a complex web application could take 3-6 months.",
      "We'll provide a detailed timeline during the project planning phase. We pride ourselves on clear communication and meeting deadlines."
    ]
  },
  {
    patterns: ["process", "work process", "how do you work", "stages"],
    responses: [
      "Our process includes: 1) Discovery & Requirements, 2) Design, 3) Development, 4) Testing, 5) Deployment, and 6) Support & Maintenance.",
      "We follow an agile methodology with regular updates and client feedback throughout the project lifecycle. This ensures we stay aligned with your vision."
    ]
  },
  {
    patterns: ["thank", "thanks", "thank you"],
    responses: [
      "You're welcome! Is there anything else I can help you with?",
      "Happy to help! Let me know if you have any other questions.",
      "My pleasure! Don't hesitate to reach out if you need more information."
    ]
  }
];

export const getFallbackResponse = (): string => {
  const fallbacks = [
    "I'm not sure I understand. Could you please rephrase your question?",
    "I'm still learning. Could you try asking that in a different way?",
    "I didn't quite catch that. If you need immediate assistance, please contact our team through the Contact page.",
    "I'm not sure how to respond to that. Would you like to know about our services or portfolio instead?"
  ];
  
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
};

export const findResponse = (userInput: string): string => {
  const lowerInput = userInput.toLowerCase();
  
  // Check each response pattern for a match
  for (const item of botResponses) {
    if (item.patterns.some(pattern => lowerInput.includes(pattern))) {
      // Return a random response from the matching category
      return item.responses[Math.floor(Math.random() * item.responses.length)];
    }
  }
  
  // If no match is found, return a fallback response
  return getFallbackResponse();
};