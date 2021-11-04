import React, { useEffect, useState } from "react";
import styles from './Card.module.css'
import { FaStar, FaStarHalf } from "react-icons/fa";

function Card (props) {
  // const [stars, setStars]=useState('pendig')
  const [stars,setStars] = useState()

  useEffect(()=>{
    let rating = props.res.rating
    let rest = rating-parseInt(rating)
    let arrReturn =[]
    for (let i = 0; i < parseInt(rating); i++) {
      arrReturn.push(<FaStar/>)
    }
    if(rest>0.75){
      arrReturn.push(<FaStar/>)
    }else if(rest>0.25 && rest<=0.75){
      arrReturn.push(<FaStarHalf/>)
    }
    setStars(arrReturn)
  })

  return(
    <div className = {styles.Card} >
      <div className = {styles.Arriba}>
        <div className = {styles.Nombre}>
          {props.res.name}
        </div>
        <div className = {styles.RightUp}>
          <img className = {styles.img} src = {props.res.background_image}/>
          <div className = {styles.Stars}>
            {stars}
          </div>

        </div>
      </div>
      <div className = {styles.Medio}>
        <div>
          {props.res.genres.map((e)=>{ return <div>{e}</div>})}
        </div>
        <div>
          {props.res.platforms.map((e)=>{return <div>{e}</div>})}
        </div>

      </div>
        <div>
          {props.res.released}
        </div>
    </div>
  )
}
export default Card