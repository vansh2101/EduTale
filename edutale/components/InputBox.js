import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

export default function InputBox({placeholder, onChangeText, secure=false, keyboard='default', style, value, icon, editable=true}) {
  return (
    <View style={{...styles.container, ...style}}>
      {icon ? <Ionicons name={icon} size={24} color="#242424" /> : <></> }
      <TextInput placeholder={placeholder} style={styles.input} secureTextEntry={secure} keyboardType={keyboard} onChangeText={onChangeText} value={value} editable={editable}/>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        width: wp('80%'),
        paddingVertical: hp('1.4%'),
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: '#ccd1ff',
        marginVertical: 10,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },

    input: {
        flex: 1,
        padding: 0,
        fontFamily: 'comic_med'
    },
})