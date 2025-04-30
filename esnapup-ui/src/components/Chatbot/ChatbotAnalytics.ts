interface ChatbotInteraction {
  userMessage: string;
  botResponse: string;
  timestamp: string;
}

class ChatbotAnalytics {
  private interactions: ChatbotInteraction[] = [];

  trackInteraction(userMessage: string, botResponse: string): void {
    const interaction: ChatbotInteraction = {
      userMessage,
      botResponse,
      timestamp: new Date().toISOString()
    };
    
    this.interactions.push(interaction);
    
    // You could send this to your backend API or analytics service
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalyticsService(interaction);
    }
    
    // Log for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('Chatbot interaction:', interaction);
    }
  }

  private sendToAnalyticsService(interaction: ChatbotInteraction): void {
    // This is a placeholder for sending data to your analytics service
    // Example: fetch('/api/chatbot-analytics', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(interaction),
    // });
  }

  getInteractionHistory(): ChatbotInteraction[] {
    return [...this.interactions];
  }
}

export const chatbotAnalytics = new ChatbotAnalytics();
export default chatbotAnalytics;