import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import Constant from 'expo-constants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';


//? components
import InputBox from '../components/InputBox'
import Slider from '../components/Slider';


export default function Profile() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>

        <View style={{overflow: 'hidden'}}>
          <View style={styles.circle}/>

          <Image source={require('../assets/images/pfp.jpeg')} style={styles.pfp} />
        </View>

        <View style={{alignSelf: 'center'}}>
          <Text style={styles.label}>Name</Text>
          <InputBox value={'Vansh Sachdeva'} editable={false} style={{width: wp('87%'), marginTop: 0}}/>

          <Text style={styles.label}>Email</Text>
          <InputBox value={'vanshsachdeva2005@gmail.com'} editable={false} style={{width: wp('87%'), marginTop: 0}}/>

          <Text style={styles.label}>Institution</Text>
          <InputBox value={'Delhi Technological University'} editable={false} style={{width: wp('87%'), marginTop: 0}}/>

          <TouchableOpacity style={styles.touchable}>
            <Text style={styles.touchableText}>Change Password</Text>
            <Ionicons name="chevron-forward" size={24} color="#242424" />
          </TouchableOpacity>

          <View style={styles.options}>
            <Text style={styles.touchableText}>Notifications</Text>
            <Slider />
          </View>

          <View style={styles.options}>
            <Text style={styles.touchableText}>Dark Mode</Text>
            <Slider />
          </View>

          <TouchableOpacity style={{...styles.touchable, marginTop: 5}}>
            <Text style={{...styles.touchableText, color: '#ff3333'}}>Logout</Text>
            <Ionicons name="log-out-outline" size={30} color="#ff3333" />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flex: 1,
    width: wp('100%'),
  },

  scrollView: {
    width: wp('100%'),
  },

  circle: {
    width: hp('145%'),
    height: hp('145%'),
    borderRadius: 1000,
    backgroundColor: '#6776fe',
    alignSelf: 'center',
    marginTop: hp('-120%'),
    marginBottom: hp('-23%'),
  },

  pfp: {
    height: hp('18%'),
    aspectRatio: 1,
    borderRadius: 500,
    alignSelf: 'center',
    marginTop: hp('13.5%'),
    marginBottom: 20
  },

  label: {
    fontFamily: 'comic_semi',
    fontSize: hp('2.3%'),
    marginTop: 7,
    marginLeft: 7,
    color: '#242424'
  },

  touchable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 10,
  },

  touchableText: {
    fontFamily: 'comic_med',
    fontSize: hp('2%'),
    color: '#242424'
  },

  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
})