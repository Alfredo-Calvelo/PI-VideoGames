import axios from "axios"
import { cambiar } from "../actions/actions.js"




const initialState={
  filter: 'Api & DB',
  genres:null,
  actualGenre:'Genres',
  busqueda:'',
  rating: false
}

export default (state=initialState, action)=>{
  switch(action.type){
    case 'CAMBIAR':
      return{
        ...state,
        filter:(state.filter==='Api & DB'?'Api':state.filter==='Api'? 'DB':state.filter === 'DB'?'Api & DB':null)
      }
    case 'CARGAR_GENRE':
      console.log(action.payload);
      return{
        ...state,
        genres:action.payload
      }
      case 'CAMBIAR_GENRE':
        return{
          ...state,
          actualGenre:action.payload
        }
      case 'BUSCADOR':
        return{
          ...state,
            busqueda:action.payload
        }
        case 'RATING_TRUE':
          return{
            ...state,
            rating: true
          }
          case 'RATING_FALSE':
          return{
            ...state,
            rating: false
          }
    default:
      return state
  }
}