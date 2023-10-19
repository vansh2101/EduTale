import React, {useState} from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function Slider() {

    const [on, setOn] = useState(false)

  return (
    <Pressable 
    style={{...styles.container, flexDirection: on ? 'row-reverse' : 'row', backgroundColor: on ? '#9aa4fe' : '#bfbfbf'}} 
    onPress={() => {setOn(!on)}}
    >
      <View style={styles.circle}></View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
        width: wp('12.5%'),
        height: wp('7%'),
        borderRadius: 30,
        padding: 5,
        alignItems: 'center',
    },

    circle: {
        width: wp('4.7%'),
        height: wp('4.7%'),
        borderRadius: 50,
        backgroundColor: '#3A4FFE'
    },
})