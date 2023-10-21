import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//? screens
import Library from '../screens/Library';
import Comic from '../screens/Comic';
import Tabs from './Tabs';



const Stack = createNativeStackNavigator();

function ComicStack({onReady}) {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="library" component={Tabs} />
        <Stack.Screen name="comic" component={Comic} />
      </Stack.Navigator>
  );
}

export default ComicStack;