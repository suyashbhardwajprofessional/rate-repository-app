import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    // Get the access token for the storage
    let userToken = 'nono';
    userToken = await AsyncStorage.getItem(`${this.namespace}:token`);
    if (userToken !== null) {
      // value previously stored
      return userToken;
    } else {
      return '';
    }
  }
  catch(e) {
    // error reading value
    return '';
  }

  async setAccessToken(accessToken) {
    // Add the access token to the storage
    await AsyncStorage.setItem(`${this.namespace}:token`, accessToken);
  }

  // const setAccessToken = async (accessToken) => {
  //   try {
  //     await AsyncStorage.setItem(`${this.namespace}:token`, accessToken);
  //   } catch (e) {
  //     // saving error
  //   }
  // };

  async removeAccessToken() {
    // Remove the access token from the storage
    await AsyncStorage.removeItem(`${this.namespace}:token`);
  }
}

export default AuthStorage;
