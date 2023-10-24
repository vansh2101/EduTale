import React, {useEffect} from 'react'
import styles from './Block.module.css'
import data from '../characterlist.json'

function Block({speaker, txt, style, character, emotion, pose, id, mirror}) {
  try{
    var character_face = data[character]["files"]["emotion"][emotion.toLowerCase()]
  }
  catch{
    var character_face = data[character]["files"]["emotion"]['happy']
  }

  return (
    <div className={styles.container} style={style} id={id}>

        <img src={`https://gramener.com/comicgen/v1/comic?name=${character}&angle=straight&emotion=${character_face}&pose=${pose}&x=0&y=0&mirror=${mirror}&ext=png`} className={styles.block} style={{marginLeft: mirror ? '30%' : '7%'}} />
        
        {/* <img src={`https://gramener.com/comicgen/v1/comic?name=${character}&angle=straight&emotion=${character_face}&pose=${pose}&x=0&y=0&ext=png`} className={`${styles.block} ${styles.char1}`} style={{right: '7%'}} /> */}

        <div className={styles.text}>
          <span className={styles.speaker}><i>{speaker}</i></span>: {txt}
        </div>
    </div>
  )
}

export default Block