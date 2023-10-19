import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

//? components
import InputBox from '../components/InputBox';
import Btn from '../components/Btn';


function Login({navigation}) {
  return (
    <View style={styles.container}>
        <View style={styles.circle}/>

        <TouchableOpacity onPress={() => {navigation.goBack()}} style={styles.backBtn}>
          <Ionicons name="chevron-back-sharp" size={40} color="#242424" />
        </TouchableOpacity>

        <Text style={styles.heading}>Login</Text>
        <Text style={styles.subHeading}>Please Sign In to Continue</Text>

        <InputBox placeholder={'Enter Your Email'} icon={'mail'} />
        <InputBox placeholder={'Enter Your Password'} icon={'key'} secure={true} />

        <Pressable>
          <Text style={styles.link}>Forgot your Password?</Text>
        </Pressable>

        <Btn text={'Sign In'} style={{marginTop: hp('4%'), paddingVertical: 10}} onPress={() => {navigation.navigate('main')}} />
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

  link: {
    color: '#3A4FFE',
    fontFamily: 'comic_med',
    marginLeft: 5,
    fontSize: hp('1.6%')
  },
});


export default Login;