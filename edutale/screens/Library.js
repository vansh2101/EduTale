import React, {useState, useCallback, useEffect} from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableNativeFeedback, StatusBar } from 'react-native'
import Constant from 'expo-constants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

//firebase
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

//? components
import InputBox from '../components/InputBox';
import Card from '../components/Card';
import PlayModal from '../components/PlayModal';


export default function Library({navigation}) {

  const [playModal, setPlayModal] = useState(false);
  const [comics, setComics] = useState([])
  const [loading, setLoading] = useState(true)
  const [current, setCurrent] = useState({})
  const [path, setPath] = useState('')
  const db = firebase.firestore()

  useEffect(() => {
    AsyncStorage.getItem('session').then(user => {
      if(!user) {
        navigation.navigate('Home')
      }
      else{
        db.collection('users').doc(user).collection('comics').get().then(data => {
          const arr = []
          data.forEach(doc => {
            arr.push(doc.data())
          })
    
          setComics(arr)
          setLoading(false)
        })
      }
    
    })
    
  }, [])

  const openModal = (curr) => {
    setCurrent(curr)

    firebase.storage().ref().child(`${curr.path}/0.png`).getDownloadURL().then(uri => {
      setPath(uri)
    })

    setPlayModal(true)
  }

  const playComic = () => {
    setPlayModal(false)
    navigation.navigate('play', {data: current})
  }


  if(loading){
    return(
      <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
        <Image source={require('../assets/loader.gif')} style={{width: wp('60%'), marginLeft: wp('20%')}}/>
        <Text style={{fontFamily: 'comic_med', fontSize: hp('2%'), opacity: 0.7}}>Fetching Data</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
        <StatusBar backgroundColor={'transparent'} translucent={true} barStyle={'dark-content'} />

      <ScrollView style={{flex: 1}}>
      
      <View style={styles.topBar}>
        <Image source={require('../assets/images/pfp.png')} style={styles.pfp} />

        <View style={{marginTop: 7}}>
          <Text style={{...styles.subText, marginBottom: -10}}>Welcome Back</Text>
          <Text style={styles.heading}>Vansh Sachdeva</Text>
        </View>
      </View>

      <InputBox icon={'search'} placeholder={'Search your Library'} style={{alignSelf: 'center', width: wp('90%')}} />

      <View style={styles.main}>
        {comics.map((item, index) => (
          <Card key={index} name={item.name} subject={item.subject} slides={item.slides} img={item.path} onPress={() => openModal(item)}/>
        ))}

      </View>

      </ScrollView>

      <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#ccc', false, 30)} onPress={() => {navigation.navigate('create', {data: ''})}}>
        <View style={styles.addBtn}>
          <Ionicons name="add" size={35} color="#ccc" />
        </View>
      </TouchableNativeFeedback>

      <PlayModal visible={playModal} onPress={() => {setPlayModal(false)}} onBtnPress={playComic} data={current} img={path} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constant.statusBarHeight,
    height: hp('90%'),
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
    justifyContent: 'space-between',
    rowGap: 13,
    width: wp('92%'),
    alignSelf: 'center'
  },

  addBtn: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#242424',
    borderRadius: 500,
    zIndex: 100,
    height: hp('7%'),
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})