import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  // Store a key-value pair in AsyncStorage
  static async storeData(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error storing data for key "${key}": ${error}`);
    }
  }

  // Get the value for a key from AsyncStorage
  static async getData(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key).then((response) => {
        return response;
      });
    } catch (error) {
      console.error(`Error getting data for key "${key}": ${error}`);
      return null;
    }
  }

  // Remove a key-value pair from AsyncStorage
  static async removeData(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing data for key "${key}": ${error}`);
    }
  }
}

// export Storage class
export default Storage;
