import axios from 'axios';
import { Certification } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api/v1';

class CertificationsService {
  async getCertifications(): Promise<Certification[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/certifications`);
      return response.data;
    } catch (error) {
      console.error('Error fetching certifications:', error);
      throw error;
    }
  }

  async getCloudCertifications(): Promise<Certification[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/certifications?type=cloud`);
      return response.data;
    } catch (error) {
      console.error('Error fetching cloud certifications:', error);
      throw error;
    }
  }

  async getOnlineCertifications(): Promise<Certification[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/certifications?type=online`);
      return response.data;
    } catch (error) {
      console.error('Error fetching online certifications:', error);
      throw error;
    }
  }
}

export default new CertificationsService();