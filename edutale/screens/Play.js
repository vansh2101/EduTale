import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Image, TouchableOpacity, Text, StatusBar } from 'react-native'
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
    const [count, setCount] = useState(-1)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        (async () => {
            var arr = []

            for(let i=0; i<data.slides; i++){
                const url = await firebase.storage().ref().child(`${data.path}/${i}.png`).getDownloadURL()

                arr.push(url)
            }

            setImg(arr)
            setLoading(false)

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

    if(loading){
        return(
          <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
            <Image source={require('../assets/loader.gif')} style={{width: wp('60%'), marginLeft: wp('20%')}}/>
            <Text style={{fontFamily: 'comic_med', fontSize: hp('2%'), opacity: 0.7}}>Loading Comic</Text>
          </View>
        )
      }


  return (
    <View style={styles.container}>

        <StatusBar backgroundColor={'black'} translucent={true} barStyle={'light-content'} />

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