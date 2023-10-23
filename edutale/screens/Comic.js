import 'react-native-get-random-values';
import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function Comic({route, navigation}) {

  const [user, setUser] = useState(null)
  const {name, subject, description} = route.params

  AsyncStorage.getItem('session').then(data => {
    if(data) {
      setUser(data)
    }
  })

  if(!user){
    return(
      <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
        <Image source={require('../assets/loader.gif')} style={{width: wp('60%'), marginLeft: wp('20%')}}/>
        <Text style={{fontFamily: 'comic_med', fontSize: hp('2%'), opacity: 0.7}}>Processing Your Request</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>

      <WebView
        style={styles.webView}
        source={{ 
          uri: `https://482c-2405-201-4004-a0cc-f08f-b481-1198-6d02.ngrok-free.app/${user}/${description}/${name}/${subject}`
        }}
        />
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    position: 'relative'
  },

  webView: {
    flex: 1
  },

  backBtn: {
    position: 'absolute',
    top: 10,
    left: 10
  },
})