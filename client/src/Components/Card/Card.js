import React, { useEffect, useState } from "react";
import styles from './Card.module.css'

function Card (props) {
  // const [stars, setStars]=useState('pendig')
  // const [stars,setStars] = useState()
console.log(props);

  return(
    <div className = {styles.Card} >
      <div className={styles.ID}>{props.res.DB?`From DB: #${props.res.id}`:`ID: #${props.res.id}`}</div>
      <div className = {styles.Arriba}>
        <div className = {styles.Nombre}>
          {props.res.name}
        </div>
        <div className = {styles.RightUp}>
          <img className = {styles.img} src = {props.res.background_image}/>
          <div className = {styles.Stars}>
            Rating: {props.res.rating}
          </div>
        </div>
      </div>
      <div className = {styles.Medio}>

        <div className = {styles.Genres}>
            {props.res.genres.map((e)=>{ return <div key={e.id}>{e.name}</div>})}
        </div>
        <div className = {styles.Platforms}>
            {props.res.DB? props.res.platforms.map(elem=><div key={props.res.platforms.indexOf(elem)}>{elem}</div>)
            :
            props.res.platforms.map((elem)=>{return <div key={elem.id}>{elem.name}</div>})}
            
        </div>
            {props.res.DB?<div className={styles.description}>{props.res.description}</div>:null}
      </div>

      <div className = {styles.Released}>
        Released: {props.res.released}
      </div>

    </div>
  )
}
export default Card