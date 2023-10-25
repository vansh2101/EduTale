import React, { useState, useEffect, useLayoutEffect } from 'react';
import './App.css'
import data from './characterlist.json';
import {toPng} from 'html-to-image'
import {BsBookmarkFill} from 'react-icons/bs'

//firebase
import firebase from 'firebase/compat/app'
import {firebaseConfig} from './static/firebaseConfig'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

// components
import Block from './components/Block';

function App() {
  firebase.initializeApp(firebaseConfig)

  const [_, user, desc, name, subject] = window.location.pathname.split('/')

    const [paragraph, setParagraph] = useState('')
    const [generated, setGenerated] = useState(false)

    const [conversation, setConversation] = useState([])
    const [number, setNumber] = useState(-1)
    const [loading, setLoading] = useState(true)
    
    
    const generateConversationArray = async () => {
        const lines = paragraph.split('\n').map(line => line.trim());
        const all_characters = Object.keys(data)
        const arr = []
        const chars = []
        const chosen_characters = {}
    
        for (const line of lines) {
          if (line) {
            const parts = line.split(': ');
            if (parts.length === 2) {
              const character = parts[0].trim();

              if(!chars.includes(character)){
                chars.push(character)
                let random = Math.floor(Math.random() * all_characters.length)
                if(Object.values(chosen_characters).includes(all_characters[random])){random = Math.floor(Math.random() * all_characters.length)}
                chosen_characters[character] = all_characters[random]
              }

              const emotion = await detectEmotion(parts[1].trim())
              const comic_character = chosen_characters[character]

              const poses = Object.keys(data[comic_character]["files"]["pose"])
              let random = Math.floor(Math.random() * poses.length)
              const pose = poses[random]
              
              arr.push({ speaker: character, text: parts[1].trim(), emotion: emotion, character: comic_character, pose: pose });
            }
          }
        }


        console.log(chosen_characters)
        setConversation(arr);
        setLoading(false)
        animateComic(-1, arr.length)

    }

    const animateComic = (num, len) => {
        if(num < len-1){
          setNumber(num+1)

          setTimeout(() => {
            animateComic(num+1, len);
          }, 5000);
        }
    }

    const detectEmotion = async (text) => {
      var myHeaders = new Headers();
      myHeaders.append("apikey", "5BaIIJei28bLIhnY5HTmC7s8r1eaqget");

      var requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: myHeaders,
        body: text
      };

      return 'happy';

      await fetch("https://api.apilayer.com/text_to_emotion", requestOptions)
        .then(response => response.text())
        .then(result => {
          result = JSON.parse(result)
          const vals = Object.values(result)

          let num = 0;
          for(const val of vals){
            if(Number(val) > num){
              num = Number(val)
            }
          }

          let emo = Math.max(num.toString())
          const ind = vals.indexOf(emo)
          emo = Object.keys(result)[ind]

          if (emo !== undefined) return emo
          else return 'happy'
        })
        .catch(error => console.log('error', error));
    }

    useEffect(() => {
      generateConversationArray()
    }, [paragraph])


    useEffect(() => {
      setLoading(true)
      if (!generated) {
        try{
          var context = desc.slice(0,151)
        }
        catch(e){
          var context = desc
        }

        fetch('http://20.244.29.91:8000/generate', {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({prompt: `'${context}'Create conversation in 1000 words`})
        })
        .then(res => res.json())
        .then(data => {
          setParagraph(data.generatedText)

          setGenerated(true)
        })
        .catch(e => {
          window.alert(e)
          console.log(e)
        })
      }
    }, [generated])


    const saveComic = () => {
      console.log('start')

      for (let i=0; i < conversation.length; i++){
        const element = document.getElementById(`${i}`)
        const disp = element.style.display
        element.style.display = 'block'

        toPng(element).then(dataUrl => {
          element.style.display = disp

          upload(dataUrl, `${i}.png`).then(() => {
            console.log('done')
          })
        })

      }

      const db = firebase.firestore()

      db.collection('users').doc(user).collection('comics').doc().set({
        name: name,
        subject: subject,
        slides: conversation.length,
        path: `${user}/${subject}/${name}`,
      }).then(() => {
        console.log('done')
        window.alert('Comic Saved Successfully')
      })


    }

    const upload = async (uri, img) => {
      if (uri !== undefined){
        const response = await fetch(uri)
        const blob = await response.blob()

        const path = `${user}/${subject}/${name}/${img}`

        var ref = firebase.storage().ref().child(path)
        return ref.put(blob)
      }
    }
      
      
    return(
        <main>
           {conversation.map((item, index) => (
             <Block key={index} id={index} speaker={item.speaker} txt={item.text} style={{display: number==index ? 'block' : 'none'}} character={item.character} pose={item.pose} emotion={item.emotion} mirror={index%2 == 0 ? true: false}/>
           ))}

           <button onClick={() => {saveComic()}}>
              <BsBookmarkFill size={40} color='#fff' />
            </button>

            <div className='footer' style={{display: loading ? 'block' : 'none'}}>
              Generating Comic...
            </div>

       </main>
    )
}

export default App;
