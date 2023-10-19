import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//? screens
import Home from '../screens/Home';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Tabs from './Tabs';



const Stack = createNativeStackNavigator();

function LoginStack({onReady}) {
  return (
    <NavigationContainer onReady={onReady}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="main" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default LoginStack;