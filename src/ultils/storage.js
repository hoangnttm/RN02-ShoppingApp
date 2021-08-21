import AsyncStorage from '@react-native-async-storage/async-storage';

const setAccessToken = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('accessToken', jsonValue)
    } catch (e) {
        // saving error
        console.error(`setAccessToken Error: ${e}`);
    }
};
const getAccessToken = async () => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken')
        return accessToken != null ? JSON.parse(accessToken) : null
    } catch (e) {
        // read error
        console.error(`getAccessToken Error: ${e}`);
    }

    console.log('Done.')
}
const removeAccessToken = async () => {
    try {
      await AsyncStorage.removeItem('accessToken')
    } catch(e) {
      // remove error
    }
  
    console.log('Done.')
  }
export {getAccessToken,setAccessToken,removeAccessToken};