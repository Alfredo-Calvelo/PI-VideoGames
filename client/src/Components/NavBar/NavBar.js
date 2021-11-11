import React, { useEffect, useState } from "react";
import styles from'./NavBar.module.css'
import { Link } from 'react-router-dom';
import Logo from '../../Images/Logo.png'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actionsCreators from '../../actions/actions.js'
import axios from "axios";


function NavBar ({filter, cambiarApi, cargarGen,genres, actualGenre, cambiarGen, buscador, busqueda, rating, ratingTrue, ratingFalse}){
    
    const[res,setRes]=useState('pending')
    const[arr, setArr]= useState([])
    const [localSearch, setLocalSearch] = useState()

    useEffect(()=>{
        axios('http://localhost:3001/getGenres').then((res)=> {
        setRes(res.data)
        }).catch(err=> console.log(err))
    },[])
    cambiarGen(arr)
    
    function setBusqueda(e) {
        buscador(e.target.value)
        console.log(busqueda);
    }
    function changeRating() {
        if (rating){
            ratingFalse()
        }else{
            ratingTrue()
        }
        console.log(rating);
    }
    
    
        return(
            <div className = {styles.NavBar}>
                    <div className = {styles.Form}>
                        <input 
                        className={styles.SearchBar} placeholder='Search Game' 
                        onChange={(e)=>{setBusqueda(e)}} 
                        id='buscador'
                        />  
                    </div>
                    <div className = {styles.Botones}>
                        <div className = {styles.Menu}>
                            <div className= {styles.Boton}
                            onClick={()=>{changeRating()}}
                            >
                                Rating
                            </div>
                            <div className = {styles.Boton} >
                            Filter
                            </div>
                            <ul >
                                <div onClick={()=>{
                                    cambiarApi()
                                }}>
                                    {filter}
                                    </div>
                                {res==='pending'?null:res.map((elem)=>{
                                    return(
                                        <div key = {res.indexOf(elem)}>
                                            <p> {elem.name}</p>
                                            <input  type='checkbox' onChange={(e)=>{
                                                if(e.target.checked){
                                                    setArr([...arr, elem.name])
                                                }else{
                                                    setArr(arr.filter(e=> e!==elem.name))
                                                }
                                                
                                            }}></input>
                                        </div>

                                    )
                                })}
                            </ul>

                        </div>
                            <a className={styles.Boton} href = '/home/AddGame'>    
                                Add Game
                            </a>
                            <a className={styles.Boton} href = '/home/GamesList'>
                                Games List
                            </a>
                            


                    </div>
                    <div className = {styles.Logo}>
                        <img src={Logo} className={styles.Logo} />
                    </div>

                </div>
        )
    
}


function mapStateToProps(state){
    return{
        filter : state.filter,
        genres: state.genres,
        actualGenre:state.actualGenre,
        busqueda:state.busqueda,
        rating: state.rating
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators(actionsCreators,dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)

