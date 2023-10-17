import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

function Home() {
  return (
    <View style={styles.container}>
        <StatusBar style="auto" />

        <Image source={require('../assets/images/home.png')} />

        <Text style={styles.text}>Let's Connect Together</Text>

        <TouchableOpacity style={styles.Btn}>
            <Text style={styles.BtnText}>Login</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 30
  },

  Btn: {
    width: 100,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
  },
});


export default Home;