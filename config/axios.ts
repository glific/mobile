import axios, { AxiosInstance } from 'axios';
import Storage from '../utils/asyncStorage';

class AxiosService {
  private static instance: AxiosInstance | null = null;
  private static baseURL: string | null = null;

  static async createAxiosInstance(): Promise<AxiosInstance> {
    const serverURL = await Storage.getData('serverURL');
    AxiosService.baseURL = serverURL;
    AxiosService.instance = axios.create({
      baseURL: serverURL,
    });
    return AxiosService.instance;
  }

  static async updateServerURL(url: string): Promise<void> {
    AxiosService.baseURL = url;
    await Storage.storeData('serverURL', url);
  }

  static getServerURL() {
    return AxiosService.baseURL;
  }
}

export default AxiosService;
