import React, {useEffect} from 'react'
import styles from './Block.module.css'
import data from '../characterlist.json'

function Block({speaker, txt, style, character, emotion, pose}) {
  const character_face = data[character]["files"]["emotion"][emotion.toLowerCase()]

  return (
    <div className={styles.container} style={style}>
        <iframe src={`https://gramener.com/comicgen/v1/comic?name=${character}&angle=straight&emotion=${character_face}&pose=${pose}&x=0&y=0&ext=png`} className={styles.block} id='block' />

        <div className={styles.text}>
          <span className={styles.speaker}><i>{speaker}</i></span>: {txt}
        </div>
    </div>
  )
}

export default Block