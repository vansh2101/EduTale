import React from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function Btn({text, onPress, style, textStyle}) {
  return (
    <TouchableOpacity style={{...styles.Btn, ...style}} onPress={onPress}>
        <Text style={{...styles.BtnText, ...textStyle}}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    Btn: {
        width: wp('80%'),
        padding: 15,
        borderRadius: 10,
        borderColor: 'rgba(0,0,0,0.3)',
        backgroundColor: '#242424'
    },

    BtnText: {
        fontSize: hp('2.6%'),
        alignSelf: 'center',
        fontFamily: 'comic_med',
        opacity: 0.9,
        color: '#f3f3f3',
    }
})