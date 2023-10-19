import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Constant from 'expo-constants'

export default function Scan() {
  return (
    <View style={styles.container}>
      <Text>Scan</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constant.statusBarHeight + 5
  },
})