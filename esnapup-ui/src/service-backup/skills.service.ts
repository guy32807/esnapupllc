import axios from 'axios';
import { Skill } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api/v1';

class SkillsService {
  async getSkills(): Promise<Skill[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/skills`);
      return response.data;
    } catch (error) {
      console.error('Error fetching skills:', error);
      throw error;
    }
  }

  async getSkillsByCategory(category: string): Promise<Skill[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/skills?category=${category}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${category} skills:`, error);
      throw error;
    }
  }
}

export default new SkillsService();