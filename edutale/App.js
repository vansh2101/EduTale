import 'react-native-get-random-values';

import React, {useState, useCallback, useEffect} from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

//? Stacks
import LoginStack from './routes/LoginStack';


export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
	async function prepare(){
		try{
			await SplashScreen.preventAutoHideAsync();

			await Font.loadAsync({
				comic: require('./assets/fonts/Poppins-Regular.ttf'),
				comic_med: require('./assets/fonts/Poppins-Medium.ttf'),
				comic_semi: require('./assets/fonts/Poppins-SemiBold.ttf'),
				comic_bold: require('./assets/fonts/Poppins-Bold.ttf')
			})
		}
		catch (e){
			console.warn(e)
		}
		finally{
			setAppIsReady(true)
		}
	}

	prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
	if (appIsReady) {
	  await SplashScreen.hideAsync();
	}
  }, [appIsReady])

  if (!appIsReady){
		return null
	}

	return(
		<LoginStack onReady={onLayoutRootView} />
	)
}
