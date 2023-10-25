import 'react-native-get-random-values';
import React, {useState, useCallback, useEffect} from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

//firebase
import firebase from 'firebase/compat/app'
import {firebaseConfig} from './static/firebaseConfig'


//? Stacks
import LoginStack from './routes/LoginStack';
import ComicStack from './routes/ComicStack';


export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);
  const [initialScreen, setInitialScreen] = useState('Home');

  firebase.initializeApp(firebaseConfig)

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

			const user = AsyncStorage.getItem('session')
			if (user){
				setInitialScreen('main')
			}
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
		<LoginStack onReady={onLayoutRootView} first={initialScreen} />
	)
}
