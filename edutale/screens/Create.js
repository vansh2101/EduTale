import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

//? components
import InputBox from '../components/InputBox';
import Btn from '../components/Btn';


export default function Create({route, navigation}) {

    const {data} = route.params
    const [name, setName] = useState('')
    const [subject, setSubject] = useState('')
    const [description, setDescription] = useState(data.trim())

    const createComic = () => {
        if (name.trim() === '' || subject.trim() === '' || description.trim() === ''){
            Alert.alert('Error', 'Please fill all the fields')
            return
        }

        navigation.navigate('comic', {name: name.trim(), subject: subject.trim(), description: description.trim()})
    }

  return (
    <View style={styles.container}>
        <View style={styles.circle}/>

        <TouchableOpacity onPress={() => {navigation.goBack()}} style={styles.backBtn}>
          <Ionicons name="chevron-back-sharp" size={40} color="#242424" />
        </TouchableOpacity>

        <Text style={styles.heading}>Create Your EduTale</Text>

        <View>
            <Text style={styles.label}>Name:</Text>
            <InputBox placeholder={'Decide a Name...'} icon={'happy'} value={name} onChangeText={val => setName(val)}/>
        </View>

        <View>
            <Text style={styles.label}>Subject:</Text>
            <InputBox placeholder={'Which Subject?'} icon={'book'} value={subject} onChangeText={val => setSubject(val)}/>
        </View>

        <View>
            <Text style={styles.label}>Description:</Text>
            <InputBox placeholder={'Brief Description of the topic...'} icon={'document-text'} value={description} onChangeText={val => setDescription(val)} multiline={true}/>
        </View>

        <Btn text={'Create'} style={{marginTop: hp('7%'), paddingVertical: 10}} onPress={createComic}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        height: hp('100%') - Constants.statusBarHeight,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },

    circle: {
        width: wp('140%'),
        height: wp('140%'),
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
        fontSize: hp('3.5%'),
        color: '#242424',
        marginBottom: 20
    },  

    label: {
        fontFamily: 'comic_semi',
        fontSize: hp('2.2%'),
        color: '#242424',
        marginLeft: 7,
        marginBottom: -10,
        marginTop: 10,
        opacity: 0.8
    }
})