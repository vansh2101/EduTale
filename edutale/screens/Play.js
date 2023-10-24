import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Constants from 'expo-constants';


//firebase
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'


export default function Play({route, navigation}) {
    const [img, setImg] = useState([])
    const {data} = route.params
    const [count, setCount] = useState(0)

    useEffect(() => {

        (async () => {
            var arr = []

            for(let i=0; i<data.slides; i++){
                const url = await firebase.storage().ref().child(`${data.path}/${i}.png`).getDownloadURL()

                arr.push(url)
            }

            setImg(arr)

            animate(count)

        })()

    }, [])

    const animate = (cnt) => {
        setCount(cnt + 1)

        if(cnt < data.slides){
            setTimeout(() => {
                animate(cnt + 1)
            }, 5000)
        }
    }


  return (
    <View style={styles.container}>

        <TouchableOpacity onPress={() => {navigation.goBack()}} style={styles.backBtn}>
          <Ionicons name="chevron-back-sharp" size={40} color="#fff" />
        </TouchableOpacity>

        <Image source={{uri: img[count]}} style={styles.img} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Constants.statusBarHeight,

    },

    img: {
        width: '100%',
        height: 400,
        resizeMode: 'stretch',
    },

    backBtn: {
        position: 'absolute',
        top: 15,
        left: 10
      },
})