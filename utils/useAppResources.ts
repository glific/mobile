import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import Storage from './asyncStorage';

function useAppResources(setToken, setOrg, setUser) {
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    IcoMoon: require('../assets/fonts/icomoon.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        SplashScreen.preventAutoHideAsync();

        const sessionValue = await Storage.getData('glific_session');
        if (sessionValue !== null) {
          const parsedSessionValue = JSON.parse(sessionValue);
          setToken(parsedSessionValue.access_token);
        }

        const orgValue = await Storage.getData('glific_organisation');
        if (orgValue !== null) {
          const parsedOrgValue = JSON.parse(orgValue);
          setOrg(parsedOrgValue);
        }

        const user = await Storage.getData('glific_user');
        if (user !== null) {
          const parsedUser = JSON.parse(user);
          setUser(parsedUser);
        }
      } catch (error) {
        console.warn(error);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  return fontsLoaded && appIsReady;
}

export default useAppResources;
