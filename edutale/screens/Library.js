import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableNativeFeedback } from 'react-native'
import Constant from 'expo-constants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

//? components
import InputBox from '../components/InputBox';
import Card from '../components/Card';
import PlayModal from '../components/PlayModal';


export default function Library({navigation}) {

  const [playModal, setPlayModal] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView>
      
      <View style={styles.topBar}>
        <Image source={require('../assets/images/pfp.jpeg')} style={styles.pfp} />

        <View style={{marginTop: 7}}>
          <Text style={{...styles.subText, marginBottom: -10}}>Welcome Back</Text>
          <Text style={styles.heading}>Vansh Sachdeva</Text>
        </View>
      </View>

      <InputBox icon={'search'} placeholder={'Search your Library'} style={{alignSelf: 'center', width: wp('90%')}} />

      <View style={styles.main}>
        <Card onPress={() => setPlayModal(true)}/>
        <Card onPress={() => setPlayModal(true)}/>
        <Card onPress={() => setPlayModal(true)}/>
        <Card onPress={() => setPlayModal(true)}/>
        <Card onPress={() => setPlayModal(true)}/>
        <Card onPress={() => setPlayModal(true)}/>
      </View>

      </ScrollView>

      <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#ccc', false, 30)}>
        <View style={styles.addBtn}>
          <Ionicons name="add" size={35} color="#ccc" />
        </View>
      </TouchableNativeFeedback>

      <PlayModal visible={playModal} onPress={() => {setPlayModal(false)}} onBtnPress={() => {setPlayModal(false);navigation.navigate('comic')}} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constant.statusBarHeight + 5,
  },

  pfp: {
    width: wp('15%'),
    aspectRatio: 1,
    borderRadius: 500,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1.2%'),
    paddingHorizontal: 25,
    gap: 20
  },

  heading: {
    fontFamily: 'comic_semi',
    fontSize: hp('3%'),
  },

  subText: {
    fontFamily: 'comic',
    fontSize: hp('1.7%'),
  },

  main: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 15,
    justifyContent: 'space-evenly',
    rowGap: 13
  },

  addBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#242424',
    padding: 10,
    borderRadius: 500,
    zIndex: 100
  }
})