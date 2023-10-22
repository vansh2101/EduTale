import 'react-native-get-random-values';
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';


export default function Comic({navigation}) {
  return (
    <View style={styles.container}>

      <WebView
        style={styles.webView}
        source={{ uri: 'https://bf4c-2405-201-4004-a0cc-aa79-4c1c-c6c7-38c6.ngrok-free.app' }}
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