import React, { useEffect, useState } from "react";
import styles from './GameList.module.css'
import Card from "../Card/Card";
const { default:axios } = require('axios')


function GameList() {

  const[res,setRes]=useState('pending')

  // (async function () {
  //   let res = await axios('http://localhost:3001/buscar')
  //   setRes(res)
  // })()
  useEffect(async()=>{
    if(res === 'pending'){
      let res = await axios('http://localhost:3001/buscar')
      setRes(res.data)
    }
  })
  
  
  

  return(
  <div className = {styles.Container}>
      {res === 'pending'? <div className = {styles.Loader}></div>:  
          <>
          {res.map((elem)=>{return <Card res = {elem}/>})}
          </>
      }
  </div>
  
  
  )


}
    



export default GameList


