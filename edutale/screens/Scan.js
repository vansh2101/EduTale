import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, Alert } from 'react-native'
import Constant from 'expo-constants'
import { Camera, CameraType } from 'expo-camera';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import {useIsFocused} from '@react-navigation/native'

//firebase
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'


export default function Scan({navigation}) {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [loading, setLoading] = useState(false)
  const isFocused = useIsFocused()


  const clickSnap = () => {
    
    if(camera){
      
      camera.takePictureAsync({
        onPictureSaved: async (data) => {
          console.log(data)
          setLoading(true)

          await upload(data.uri).then(() => {console.log('uploaded')})
          
          const url = await firebase.storage().ref().child('ocr/ocr.jpg').getDownloadURL()

          fetch('https://edutaleser.vanshpro.co/ocr', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({imageUrl: url})
          })
          .then(res => res.json())
          .then(data => {
              console.log(data)
              setLoading(false)
              navigation.navigate('create', {data: data.text})
          })
          .catch(e => {
            console.log(e)
            Alert.alert('Error', 'Sorry! Some Error ocurred. Please Try Again.')
            setLoading(false)
          })
        }
      })
    }
  }

  const upload = async (uri) => {
    if (uri !== undefined){
      const response = await fetch(uri)
      const blob = await response.blob()

      const path = `ocr/ocr.jpg`

      var ref = firebase.storage().ref().child(path)
      return ref.put(blob)
    }
  }

  if(loading){
    return(
      <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
        <Image source={require('../assets/loader.gif')} style={{width: wp('60%'), marginLeft: wp('20%')}}/>
        <Text style={{fontFamily: 'comic_med', fontSize: hp('2%'), opacity: 0.7}}>Recognizing Text</Text>
      </View>
    )
  }


  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return(
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {navigation.goBack()}} style={styles.backBtn}>
        <Ionicons name="chevron-back-sharp" size={40} color="#f3f3f3" />
      </TouchableOpacity>

      { isFocused && <Camera style={styles.camera} type={CameraType.back} ref={ref => {setCamera(ref)}} />}

      <TouchableOpacity style={styles.outerCircle} onPress={clickSnap}>
        <View style={styles.circle} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constant.statusBarHeight,
    display: 'flex',
    position: 'relative',
  },

  camera: {
    width: '100%',
    height: '100%',
    zIndex: -1,
  },

  backBtn: {
    position: 'absolute',
    top: 20,
    left: 15
  },

  outerCircle: {
    width: 70,
    aspectRatio: 1,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#fff',
    position: 'absolute',
    bottom: 50,
    padding: 7,
    alignSelf: 'center',
  },

  circle: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 100,
  }
})