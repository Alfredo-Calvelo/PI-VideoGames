import React from "react";
import styles from './Card.module.css'

function Card (props) {
  console.log(props);

  return(
    <div className = {styles.Card} >
      <div>
        {props.res.name}
      </div>
      <div>
        <img className={styles.img} src = {props.res.background_image}/>
      </div>
      <div>
        {props.res.rating}
      </div>
      <div>
        {props.res.genres}
      </div>
      <div>
        {props.res.platforms}
      </div>
      <div>
        {props.res.released}
      </div>
    </div>
  )
}
export default Card