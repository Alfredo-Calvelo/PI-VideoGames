import React, { useEffect, useState } from "react";
import styles from './GameList.module.css'
import Card from "../Card/Card";
const { default:axios } = require('axios')


function GameList() {

  const[res,setRes]=useState('pending')
  const [page, setPage] = useState(1)
  const [index, setIndex] = useState([0,14])

  useEffect(async()=>{
    if(res === 'pending'){
      let res = await axios('http://localhost:3001/buscar')
      setRes(res.data)
    }
  })
  function onClickUp(){
    let length = res.length-1
    if(index[1]=== 104){
    }else{
      setPage(page+1)
      setIndex([index[0]+15,index[1]+15])
    }
  }
  function onClickDown(){
    
    if(index[0]=== 0){
    }else{
      setPage(page-1)
      setIndex([index[0]-15,index[1]-15])

    } 

  }

  return(
  <div className = {styles.Container}>
      {res === 'pending'? <div className = {styles.Loader}></div>:  
          <>
          {res.map((elem)=>{
            if(res.indexOf(elem) >= index[0] && res.indexOf(elem)<= index[1]){
              return <Card res = {elem}/>
            }else{return null}
          })}
          <span> {page} </span>
          <button onClick = {()=>{
            onClickUp()
            window.scrollTo(0,0)
          }
            }>siguiente</button>
          <button onClick = {()=>{
            window.scrollTo(0,0)
            onClickDown()
            }}>anterior</button>
          </>
      }
  </div>
  
  
  )


}
    



export default GameList


