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
  console.log(props);
  return(
    <div className = {styles.Card} >
      <div className ={styles.Arriba}>
        <div className = {styles.Izquierda}>
          <div className={styles.Nombre}>
            {props.res.name}
          </div>
        </div>
        <div className = {styles.Derecha}>
          <div className = {styles.Imagen}>
            <img className={styles.img} src = {props.res.background_image}/>
          </div>
          <div className = {styles.Stars}>
            {stars}
          </div>
        </div>
      </div>
      <div className= {styles.Abajo}>
          <div className ={styles.Genres}>
            <div>
              Genres:
            </div>
            <div>
              {props.res.genres.map((e)=>{
                return <div>{e}</div>
              })}
            </div>
          </div>
          <div className = {styles.Platforms}>
            {props.res.platforms.map((e)=>{
            return <div>{e}</div>
            })}
          </div>
      </div>
          <div className = {styles.Released}>
            {props.res.released}
          </div>
    </div>
  )
}
export default Card