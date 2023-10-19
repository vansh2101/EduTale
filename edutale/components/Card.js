import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';


export default function Card() {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={require('../assets/images/cover.jpeg')} style={styles.img} />

      <View style={{marginLeft: 7}}>
        <Text style={styles.heading}>Electrostatics</Text>

        <View style={styles.flex}>
            <Ionicons name="book" size={19} color="#242424" style={{opacity: 0.7}}/>
            <Text style={styles.subtext}>Physics</Text>
        </View>

        <View style={styles.flex}>
            <Ionicons name="time" size={19} color="#242424" style={{opacity: 0.7}}/>
            <Text style={styles.subtext}>10 slides</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        width: wp('44.5%'),
        borderWidth: 3,
        borderRadius: 15,
        borderColor: '#e6e6e6',
        borderTopWidth:0,
        borderLeftWidth:1,
        overflow: 'hidden',
    },

    img: {
        borderRadius: 15,
        width: wp('44%'),
        height: hp('25%'),
        alignSelf: 'center'
    },

    heading: {
        fontFamily: 'comic_semi',
        fontSize: wp('4.7%'),
        marginTop: 5,
    },

    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginBottom: 5
    },

    subtext: {
        fontFamily: 'comic_med',
        fontSize: wp('3.2%'),
        opacity: 0.7
    },
})