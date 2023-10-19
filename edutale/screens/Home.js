import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

//? components
import Btn from '../components/Btn';


function Home({navigation}) {
  return (
    <View style={styles.container}>
        <StatusBar style="auto" />

        <View style={{position: 'relative', marginTop: hp('12%')}}>
          <View style={styles.circle}/>
          <Image source={require('../assets/images/home.png')} style={styles.img} />
        </View>

        <Text style={styles.text}>
          Welcome to the world of 
          <Text style={styles.heading}> EduTale</Text>
        </Text>

        <Btn text={'Login'} onPress={() => {navigation.navigate('Login')}} style={{borderWidth: 1, backgroundColor: 'transparent', borderRadius: 100, width: wp('90%')}} textStyle={{color: '#242424'}} />

        <Btn text={'Sign Up'} onPress={() => {navigation.navigate('Signup')}} style={{borderRadius: 100, width: wp('90%')}}/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 15,
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  circle: {
    width: wp('53%'),
    height: wp('50%'),
    borderRadius: 200,
    backgroundColor: '#4d5ffe',
    position: 'absolute',
    top: hp('8.5%'),
    alignSelf: 'center',
  },

  img: {
    opacity: 0.9,
    height: hp('30%'),
    aspectRatio: 1,
  },

  text: {
    fontSize: hp('2.7%'),
    fontFamily: 'comic_med',
    marginTop: hp('8%'),
    marginBottom: 25,
    textAlign: 'center',
    width: wp('85%'),
    color: '#242424',
  },

  heading: {
    fontSize: hp('4.5%'),
    fontFamily: 'comic_semi',
  },

  Btn: {
    width: wp('90%'),
    padding: 15,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
  },

  BtnText: {
    fontSize: hp('2.6%'),
    alignSelf: 'center',
    fontFamily: 'comic_med',
    opacity: 0.9,
    color: '#242424',
  }
});


export default Home;