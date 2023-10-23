import React, { useState, useEffect } from 'react';
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

  const params = window.location.search.replace('?', '').split('&')


    const [paragraph, setParagraph] = useState(`
        Bob: Hey, what are you looking at? 

        Alice: This diagram here has been drawing my attention for a while now. I was trying to figure out what it might be illustrating, and then it hit me.

        Bob: Ok so what is it?

        Alice: It's an illustration of the photoelectric effect.

        Bob: Photoelectric effect? Never heard of it. Care to explain?

        Alice: Sure! It's a phenomenon in which electrons are ejected from the surface of a metal when light is incident on it. These electrons ejected from the metal are called photoelectrons.

        Bob: Interesting! How does it work?

        Alice: Good question! Whenever light strikes the metal, it excites the atomic electrons, causing them to break free from the atom and become the photoelectric electrons that are released. Depending on the intensity of the incident light, the energy of the photoelectron released can be very high.

        Bob: So, you're saying the light not only excites the electrons, it also gives them energy?

        Alice: Exactly! It turns out that the higher the frequency of the incident light, the higher the energy of the photoelectrons emitted.

        Bob: Hmm, I'm still a bit confused as to what makes this effect different from other phenomena like reflection and refraction.

        Alice: Well, the key difference between the photoelectric effect and reflection or refraction lies in the fact that in order for the photoelectric effect to occur, light must be intense enough to break the bond between an electron and an atom. That kind of interaction isn't present with reflection or refraction.

        Bob: Now that I understand the basis of the photoelectric effect, what is its practical application?

        Alice: The photoelectric effect has a wide variety of applications. For example, it is used in some security systems, where light sensors detect the presence of individuals in a specific area. It is also used in solar power generation, since solar cells use the photoelectric effect to convert light into electricity. The effect can also be used to measure the intensity of light, since when the electrons are emitted, the number of electrons is proportional to the intensity of light. Finally, it is used in photo-therapy, a treatment for certain kinds of skin disorders.

        Bob: Wow, all these applications! I must admit I'm really impressed.

        Alice: I'm glad I could help! I find the photoelectric effect fascinating, don't you?

        Bob: Definitely! Thanks for providing such comprehensive information.

        Alice: Anytime!
    `)

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

          return emo
        })
        .catch(error => console.log('error', error));
    }


    useEffect(() => {
        generateConversationArray()
      }, [])


    const saveComic = () => {
      console.log('start')

      for (let i=0; i < conversation.length; i++){
        const element = document.getElementById(`${i}`)
        const disp = element.style.display
        element.style.display = 'block'

        toPng(element).then(dataUrl => {
          element.style.display = disp
          console.log(dataUrl)

          upload(dataUrl, `${i}.png`).then(() => {
            console.log('done')
          })
        })

      }

      const db = firebase.firestore()

      db.collection('users').doc('vanshsachdeva2005@gmail.com').collection('comics').doc().set({
        user: 'user',
        name: 'sample',
        subject: 'sample',
        slides: conversation.length,
        path: 'sample',
      }).then(() => {
        console.log('done')
      })

      setLoading(false)

    }

    const upload = async (uri, name) => {
      if (uri !== undefined){
        const response = await fetch(uri)
        const blob = await response.blob()

        const path = `sample/${name}`

        var ref = firebase.storage().ref().child(path)
        return ref.put(blob)
      }
    }

    if(loading){
      return(
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, alignItems: 'center'}}>
          <img src={'./loader.gif'} style={{width: '60%', marginLeft: '20%'}}/>
          <span style={{fontSize: '2vh', opacity: 0.7}}>Generating Comic</span>
        </div>
      )
    }
      

      
    return(
        <main>
           {conversation.map((item, index) => (
             <Block key={index} id={index} speaker={item.speaker} txt={item.text} style={{display: number==index ? 'block' : 'none'}} character={item.character} pose={item.pose} emotion={item.emotion} mirror={index%2 !== 0 ? true: false}/>
           ))}

           <button onClick={() => {setLoading(true);saveComic()}}>
              <BsBookmarkFill size={40} color='#fff' />
            </button>

       </main>
    )
}

export default App;
