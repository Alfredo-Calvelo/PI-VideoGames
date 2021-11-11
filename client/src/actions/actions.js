import axios from "axios"

export const CAMBIAR = 'CAMBIAR'
export const CAMBIAR_GENRE = 'CAMBIAR_GENRE'
export const CARGAR_GENRE = 'CARGAR_GENRE'
export const BUSCADOR = 'BUSCADOR'
export const RATING_TRUE = 'RATING_TRUE'
export const RATING_FALSE = 'RATING_FALSE'

export const cambiarApi=()=>{
  return{
    type:CAMBIAR
  }
}
export const cargarGen=(param)=>{
  let indexActual =param
  let actual 
  return(dispatch,getState)=>{
    axios.get('http://localhost:3001/getGenres')
    .then((res)=> { actual=res.data[param]
    })
    dispatch({type: CARGAR_GENRE, payload:actual})

  }
}
export const cambiarGen=(genre)=>{
  return{
    type:CAMBIAR_GENRE,
    payload:genre
  }
}
export const buscador = (busqueda)=>{
  return{
    type: BUSCADOR,
    payload:busqueda
  }
}

export const ratingTrue = ()=>{
  return{
    type: RATING_TRUE
  }
}
export const ratingFalse = ()=>{
  return{
    type: RATING_FALSE
  }
}