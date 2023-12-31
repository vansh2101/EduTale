import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import Constant from 'expo-constants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

//? components
import InputBox from '../components/InputBox';
import Card from '../components/Card';
import PlayModal from '../components/PlayModal';


export default function Explore() {

  const [playModal, setPlayModal] = useState(false);

  return (
    <View style={styles.container}>
      
      <Text style={styles.heading}>Explore</Text>

      <InputBox icon={'search'} placeholder={'Explore...'} style={{alignSelf: 'center', width: wp('90%'), marginTop: 5}} />

      <View style={{height: hp('73%')}}>
        <ScrollView>
          <View style={styles.main}>
          <Card name={'Motion'} subject={'Physics'} slides={23} onPress={() => setPlayModal(true)}/>
          <Card name={'Organic'} subject={'Chemistry'} slides={29} onPress={() => setPlayModal(true)}/>
          <Card name={'Calculas'} subject={'Maths'} slides={42} onPress={() => setPlayModal(true)}/>
          <Card name={'Algebra'} subject={'Maths'} slides={26} onPress={() => setPlayModal(true)}/>
          <Card name={'Atoms'} subject={'Chemistry'} slides={23} onPress={() => setPlayModal(true)}/>
              
          </View>

        </ScrollView>
      </View>

      <PlayModal visible={playModal} onPress={() => {setPlayModal(false)}} data={{name: 'Motion', subject: 'Physics', slides: 23}} />

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
    marginVertical: 15,
    justifyContent: 'space-between',
    rowGap: 13,
    width: wp('92%'),
    alignSelf: 'center'
  },
})