import * as React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


//? screens
import Library from '../screens/Library.js'
import Explore from '../screens/Explore.js'
import Scan from '../screens/Scan.js'
import Profile from '../screens/Profile.js'


const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
            let iconName;

            if (route.name === 'Library') {
                iconName = 'book';
            }
            else if (route.name === 'Explore'){
                iconName = 'search'
            }
            else if (route.name === 'Scan'){
                iconName = 'ios-scan-sharp'
            }
            else if (route.name === 'Profile'){
                iconName = 'person-circle-outline'
            }

            return(
              focused ?
                <View style={{backgroundColor: '#fff', borderRadius: 10, width: 45, height: 45, alignItems: 'center', justifyContent: 'center'}}>
                  <Ionicons name={iconName} size={26} color={color} />
                </View>
                :
                  <Ionicons name={iconName} size={26} color={color} />
            )
        },

        tabBarActiveTintColor: '#242424',
        tabBarInactiveTintColor: '#f3f3f3',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle:{
            width: wp('90%'),
            alignSelf: 'center',
            marginBottom: hp('2.2%'),
            backgroundColor: '#242424',
            borderRadius: 15,
            height: 62,
            elevation: 10
        }
    })}
    >
      <Tab.Screen name="Library" component={Library} />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Scan" component={Scan} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}


export default Tabs