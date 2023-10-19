import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import Constant from 'expo-constants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

//? components
import InputBox from '../components/InputBox';
import Card from '../components/Card';


export default function Explore() {
  return (
    <View style={styles.container}>
      
      <Text style={styles.heading}>Explore</Text>

      <InputBox icon={'search'} placeholder={'Explore...'} style={{alignSelf: 'center', width: wp('90%'), marginTop: 5}} />

      <View style={{height: hp('73%')}}>
        <ScrollView>
          <View style={styles.main}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </View>

        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constant.statusBarHeight + 5,
    display: 'flex',
    flexDirection: 'column'
  },

  heading: {
    fontFamily: 'comic_semi',
    fontSize: hp('4%'),
    marginHorizontal: 25,
  },

  main: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    rowGap: 13,
    marginVertical: 10
  }
})