import React from 'react'
import { StyleSheet, Text, View, Modal, Image, Pressable, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import Constant from 'expo-constants'

//? components
import Btn from './Btn';


export default function PlayModal({visible, onPress}) {
  return (
    <Modal statusBarTranslucent={true} visible={visible} animationType='slide' transparent={true}>
      <View style={styles.modal}>
        <Pressable onPress={onPress} style={styles.invisible}/>

        <View style={styles.container}>
            <Image source={require('../assets/images/cover.jpeg')} style={styles.img} />

            <Text style={styles.heading}>Electrostatics</Text>


            <View style={styles.flex}>
                <Ionicons name="book" size={19} color="#242424" style={{opacity: 0.7}}/>
                <Text style={styles.subtext}>Physics</Text>

                <Ionicons name="time" size={19} color="#242424" style={{opacity: 0.7, marginLeft: 5}}/>
                <Text style={styles.subtext}>10 slides</Text>
            </View>

            <View style={{...styles.flex, marginVertical: 15}}>
                <TouchableOpacity>
                    <Ionicons name="reload" size={30} color="#242424" style={{marginRight: 20}}/>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Ionicons name="trash-bin" size={30} color="#ff3333"/>
                </TouchableOpacity>
            </View>

            <Btn text={'Play'} style={{marginTop: 20, width: wp('60%'), paddingVertical: 5}} />
        </View>

      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    modal: {
        width: wp('100%'),
        height: hp('100%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000080',
        marginTop: Constant.statusBarHeight
    },

    container: {
        backgroundColor: '#e6e8ff',
        width: wp('85%'),
        borderRadius: 20,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    img: {
        borderRadius: 10,
        height: hp('25%'),
        width: wp('37%'),
        resizeMode: 'stretch',
    },

    heading: {
        fontFamily: 'comic_semi',
        fontSize: hp('2.7%')
    },

    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
    },

    subtext: {
        fontFamily: 'comic_med',
        fontSize: wp('3.2%'),
        opacity: 0.7,
        marginRight: 5
    },

    invisible: {
        position: 'absolute',
        width: wp('100%'),
        height: hp('100%'),
        top: 0,
        left: 0,
        zIndex: -1
    }
})