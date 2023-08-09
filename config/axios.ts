import axios, { AxiosInstance } from 'axios';
import Storage from '../utils/asyncStorage';

class AxiosService {
  private static instance: AxiosInstance | null = null;
  private static baseURL: string | null = null;

  static async createAxiosInstance(): Promise<AxiosInstance> {
    if (!AxiosService.baseURL) {
      const orgValue = await Storage.getData('glific_organisation');
      if (orgValue) {
        const parsedOrgValue = JSON.parse(orgValue);
        AxiosService.baseURL = parsedOrgValue.url;
      }
    }
    AxiosService.instance = axios.create({
      baseURL: AxiosService.baseURL,
    });
    return AxiosService.instance;
  }

  static async updateServerURL(url: string): Promise<void> {
    AxiosService.baseURL = url;
    const orgValue = await Storage.getData('glific_organisation');
    if (orgValue) {
      const parsedOrgValue = JSON.parse(orgValue);
      const updatedOrgValue = JSON.stringify({ ...parsedOrgValue, url });
      await Storage.storeData('glific_organisation', updatedOrgValue);
    }
  }

  static getServerURL() {
    return AxiosService.baseURL;
  }
}

export default AxiosService;
