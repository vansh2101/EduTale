import React from 'react'
import styles from './Block.module.css'

function Block({}) {
  return (
    <div className={styles.container}>
        <iframe src='https://gramener.com/comicgen/v1/comic?name=dee&angle=straight&emotion=angry&pose=handsfolded&x=0&y=170&ext=png' className={styles.block} />
    </div>
  )
}

export default Block