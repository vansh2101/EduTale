import 'react-native-get-random-values';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function Comic() {
  return (
    <View style={styles.container}>
      <WebView
        style={styles.webView}
        source={{ uri: 'https://0071-2405-201-4004-a0cc-d7da-140d-c37b-2a72.ngrok-free.app' }}
        />
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },

  webView: {
    flex: 1
  }
})