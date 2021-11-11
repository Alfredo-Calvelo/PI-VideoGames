import React, { useEffect, useState } from "react";
import styles from './GameList.module.css'
import Card from "../Card/Card";
import { Redirect } from "react-router";
import axios from "axios";
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actionsCreators from '../../actions/actions.js'
import Falla from "../../Falla/Falla";


function GameList({filter, actualGenre, busqueda, rating}) {
  const[res,setRes]=useState('pending')
  const [page, setPage] = useState(0)
  const [index, setIndex] = useState([0 + 15*page,14 +15*page ])
  const[arrDB, setArrDB] = useState([])
  const[arrApi, setArrApi]=useState([])


  useEffect(()=>{
      axios('http://localhost:3001/todos').then((res)=> {
        setRes(res.data)
        setArrApi( res.data.filter(elem=>elem.DB === false))
        setArrDB( res.data.filter(elem=>elem.DB===true))
      }).catch(err=> console.log(err))
  },[])

  
  
  function onClickUp(){

    if(res.length/15 > page && res.length/15 <page+1){

    }else{
      setIndex([index[0]+15,index[1]+15])
      setPage(page+1)
      window.scrollTo(0,0)

    }
  }
  function onClickDown(){
    if(page>0){
      setIndex([index[0]-15,index[1]-15])    
      setPage(page-1)
      window.scrollTo(0,0)
    }
  }
  function filteredGames(arr){
    return arr.slice(index[0],index[1]+1)
  }
  function searchFilter(arr) {
    let arrReturn=[]
    arr.map(elem=>{
      if(elem.name.toLowerCase().includes(busqueda.toLowerCase())){
        arrReturn.push(elem)
      }
    })
    return arrReturn
  }

  function genreFilter(arr){
    let arrReturn=[]

    arr.map(elem=>{
      elem.genres.map(genre=>{
        if (actualGenre.includes(genre.name)) {
          // console.log(genre);
          if(arrReturn.includes(elem)){

          }else{
            arrReturn.push(elem)

          }
          
        }
      })
    })
    // console.log(arrReturn);
    return arrReturn

  }

  function ratingOrder(arr) {
    return arr.sort(compare)
    

  }
  function compare(a,b) {
    if (a.rating> b.rating){
      return -1
    }
    if (a.rating<b.rating) {
      return 1
    }
    return 0
    
  }


  
  return(
    <>
    <div className = {styles.Container}>
      {res === 'pending'? <div className={styles.Loader}></div>:  
          <>
          {typeof(res)=== 'string'? <Redirect to='/ErrorPage' /> :


          filter==='Api & DB' && actualGenre.length===0?


          busqueda.length >0?
          rating=== true?
          searchFilter(ratingOrder(filteredGames(res))).map(elem=>{
            return <Card res = {elem} key= {elem.id}/> 
          })
          :
          ratingOrder(filteredGames(res)).map((elem)=>{
            return <Card res = {elem} key= {elem.id}/> 
          }
          ):
          
          
          filter==='Api & DB' && actualGenre.length>0?

          busqueda.length>0?
          searchFilter(filteredGames(genreFilter(res))).map(elem=>{
            return <Card res = {elem} key= {elem.id}/>                   
          })
          
          :
          filteredGames(genreFilter(res)).map(elem=>{
                return <Card res = {elem} key= {elem.id}/>                   
              })




              :filter === 'Api' && actualGenre.length===0? 
              busqueda.length >0?
              searchFilter(filteredGames(arrApi)).map(elem=>{
                return <Card res = {elem} key= {elem.id}/> 
              })
              :
              filteredGames(arrApi).map((elem)=>{
                return <Card res = {elem} key= {elem.id}/> 
              }
              )
              
              
              
              :
              
              filter === 'Api' && actualGenre.length>0?
              busqueda.length >0?
              searchFilter(filteredGames(genreFilter(arrApi))).map(elem=>{
                
                return <Card res = {elem} key= {elem.id}/> 
              })
              :
              filteredGames(genreFilter(arrApi)).map((elem)=>{
                return <Card res = {elem} key= {elem.id}/> 
              }
              )
                
                
                
                :filter==='DB' && actualGenre.length===0? 
                busqueda.length >0?
                searchFilter(filteredGames(arrDB)).map(elem=>{
                  
                  return <Card res = {elem} key= {elem.id}/> 
                })
                :
                filteredGames(arrDB).map((elem)=>{
                  return <Card res = {elem} key= {elem.id}/> 
                }
                )
                
                :

                filter==='DB' && actualGenre.length>0?
                
                busqueda.length >0?
                searchFilter(filteredGames(genreFilter(arrApi))).map(elem=>{
                  
                return <Card res = {elem} key= {elem.id}/> 
                })
                :
                filteredGames(genreFilter(arrApi)).map((elem)=>{
                  return <Card res = {elem} key= {elem.id}/> 
                })  
                
                :null:null
                
              }
                
            
            
        
          </>
      }
  </div>
      {res === 'pending'?null:
      <div className= {styles.DownBar}>
        <div></div>
        <div className={styles.MediumDownBar}>
          <button  className={styles.pageButton}
              onClick = {()=>{
                onClickDown()
              }}
          
          >
          Página Anterior
          </button>
            


          <button className={styles.pageButton} 
          onClick={()=>{ 
            onClickUp()
          }}
          >
          Página Siguiente
          </button>
            
        </div>
      </div>
      }
      
  </>
  
  )
  
}


    

function mapStateToProps(state){
  return{
      filter : state.filter,
      genres: state.genres,
      actualGenre:state.actualGenre,
      busqueda: state.busqueda,
      rating: state.rating
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(actionsCreators,dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(GameList)


