import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

//? components
import InputBox from '../components/InputBox';
import Btn from '../components/Btn';


function SignUp({navigation}) {
  return (
    <View style={styles.container}>
        <View style={styles.circle}/>

        <TouchableOpacity onPress={() => {navigation.goBack()}} style={styles.backBtn}>
          <Ionicons name="chevron-back-sharp" size={40} color="#242424" />
        </TouchableOpacity>

        <Text style={styles.heading}>Sign Up</Text>
        <Text style={styles.subHeading}>Please Create an Account</Text>

        <InputBox placeholder={'Enter Your Name'} icon={'happy'} />
        <InputBox placeholder={'Enter Your Email'} icon={'mail'} />
        <InputBox placeholder={'Enter Your Institution'} icon={'school'} />
        <InputBox placeholder={'Enter Your Password'} icon={'key'} secure={true} />
        <InputBox placeholder={'Confirm Your Password'} icon={'lock-closed'} secure={true} />

        <Btn text={'Register'} style={{marginTop: hp('4%'), paddingVertical: 10}} onPress={() => {navigation.navigate('comic')}} />
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