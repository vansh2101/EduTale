import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import Constants from 'expo-constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

//firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//? components
import InputBox from '../components/InputBox';
import Btn from '../components/Btn';


function SignUp({navigation}) {

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [institution, setInstitution] = useState()
  const [password, setPassword] = useState()
  const [cpass, setCpass] = useState()
  const [loading, setLoading] = useState(false)


  const signup = () => {
    if(password !== cpass){
      Alert.alert('Error', 'Passwords do not match')
      return
    }

    if(!name || !email || !institution || !password){
      Alert.alert('Empty Fields', 'Please fill in all the fields')
      return
    }

    const data = {
      name: name,
      email: email,
      institution: institution,
    }

    setLoading(true)

    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
          console.log(data)
      })
      .catch(e => console.log(e));

      console.log('yup')

    const db = firebase.firestore();
    db.collection('users')
      .doc(email)
      .set(data)
      .then(data => {
        setLoading(false)
        navigation.navigate('Login')
      })
      .catch(e => console.log(e));
  }

  if(loading){
    return(
      <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
        <Image source={require('../assets/loader.gif')} style={{width: wp('60%'), marginLeft: wp('20%')}}/>
        <Text style={{fontFamily: 'comic_med', fontSize: hp('2%'), opacity: 0.7}}>Creating Your Account</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
        <View style={styles.circle}/>

        <TouchableOpacity onPress={() => {navigation.goBack()}} style={styles.backBtn}>
          <Ionicons name="chevron-back-sharp" size={40} color="#242424" />
        </TouchableOpacity>

        <Text style={styles.heading}>Sign Up</Text>
        <Text style={styles.subHeading}>Please Create an Account</Text>

        <InputBox placeholder={'Enter Your Name'} icon={'happy'} onChangeText={setName}/>
        <InputBox placeholder={'Enter Your Email'} icon={'mail'} onChangeText={setEmail}/>
        <InputBox placeholder={'Enter Your Institution'} icon={'school'} onChangeText={setInstitution}/>
        <InputBox placeholder={'Enter Your Password'} icon={'key'} secure={true} onChangeText={setPassword} />
        <InputBox placeholder={'Confirm Your Password'} icon={'lock-closed'} secure={true} onChangeText={setCpass}/>

        <Btn text={'Register'} style={{marginTop: hp('4%'), paddingVertical: 10}} onPress={signup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    position: 'relative',
    marginTop: Constants.statusBarHeight,
    paddingLeft: 30,
    height: hp('100%') - Constants.statusBarHeight,
    justifyContent: 'center',
  },

  circle: {
    width: wp('150%'),
    height: wp('150%'),
    borderRadius: 1000,
    backgroundColor: '#6776fe',
    alignSelf: 'center',
    position: 'absolute',
    top: wp('-100%'),
    right: wp('-90%'),
    alignSelf: 'center',
  },

  backBtn: {
    position: 'absolute',
    top: 10,
    left: 10
  },

  heading: {
    fontFamily: 'comic_bold',
    fontSize: hp('5%'),
    color: '#242424'
  },  

  subHeading: {
    fontFamily: 'comic_med',
    fontSize: hp('1.9%'),
    color: '#3A4FFE',
    marginBottom: hp('2%'),
  },
});


export default SignUp;