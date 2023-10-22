import React, {useState} from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import Constant from 'expo-constants'
import { Camera, CameraType } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
// import { createWorker } from 'tesseract.js';


export default function Scan({navigation}) {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);


  const clickSnap = () => {
    if(camera){
      camera.takePictureAsync({
        onPictureSaved: (data) => {
        console.log(data)

        // recognizeText(data.uri)

        return data.uri
        }
      })
    }
  }

  // const recognizeText = async (imageUri) => {
  //   // const worker = await createWorker('eng');
  //   // const data = await worker.recognize(imageUri);

  //   createWorker('eng').then(worker => {
  //     const data = worker.recognize(imageUri);
  //     console.log(data)
  //   })


  //   // await worker.terminate();
  // }


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

      <Camera style={styles.camera} type={CameraType.back} ref={ref => {setCamera(ref)}} />

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