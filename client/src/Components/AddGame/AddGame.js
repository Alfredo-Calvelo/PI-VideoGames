import React, { useEffect, useState } from "react";
import styles from './AddGame.module.css'
const { default:axios } = require('axios')

function AddGame(){


  const [rating, setRating]=useState(2.5)
  const [genres, setGenres] = useState(null)
  const [res,setRes] = useState('pending')

  const[midlePlatform, setMidle]=useState()


  const [name, setName] = useState('')
  const [released, setReleased ] = useState(null)
  const [addedPlatforms, setPlatforms] = useState([])
  const [description, setDescription] = useState('')
  const [addedGenres, setAddedGenres] = useState([])
  



  useEffect(
    async ()=>{
      if(res === 'pending'){
        try {
          const res = await axios('http://localhost:3001/getGenres')
          setGenres(res)
          setRes('Complete')
          console.log(res);
          
        } catch (error) {
          console.log(error);
        }
      } 
    },[]
  )


    function Complete(){
      if(name==='complete' && released === 'complete' && addedPlatforms.length>0 && description === 'complete' &&
      addedGenres.length>0){
        return true
      }
      else return false
      
      // console.log(name);
      // console.log(released);
      // console.log(addedPlatforms);
      // console.log(description);
      // console.log(addedGenres);
    }
    async function request(){
      let request = await axios({
          method:'POST',
          url: 'http://localhost:3001/AddGame',
          params:{
              name: document.getElementById('name').value,
              released: document.getElementById('released').value,
              rating: parseFloat(document.getElementById('rating').value),
              description: document.getElementById('description').value,
              platforms: addedPlatforms,
              genres: addedGenres
              
          }
      })
      if(request.data.original){
          console.log(request.data.original.detail);
      }else{alert(request.data)}
  }



    function formChange (e, name){
      if(e.target.value === ''){
        name('incomplete')

      }else{
        name('complete')
      }
    }

  return(
    <>
    {genres === null ? <div className = {styles.Loader}></div> :
    <div className = {styles.Container}>


      <div className = {styles.Main}>


        <input placeholder = 'Name'
        id='name'
        className ={name=== 'complete'? styles.Campos: styles.error}
        onChange={(e)=>{
          formChange(e,setName)
        }}
        />


        <input placeholder = 'Released'
        id='released'
        className ={released==='complete'? styles.Campos:styles.error}
        type= 'date'
        onChange={(e)=>{
          formChange(e,setReleased)
        }}
        />


        <div className ={styles.Rating}>
          <div > 
            <span>Rating:</span>
            <span>{rating}</span>  
          </div> 
          <input id='rating'
          className={styles.Bar}  type="range" max = {5} min= {0}
          defaultValue = {2.5} step ={0.5}
          onInput={(value)=>{
            setRating(value.target.value)
          }}/>
        </div>


        <div className ={addedPlatforms.length > 0? styles.PlatformDiv: styles.errorplatfrom}>
          <input placeholder = 'Platforms'
          id='platformInput'
          className ={styles.Platforms}
          onChange={(e)=>{ 
            setMidle(e.target.value)
          }}/>
          <button className={styles.Boton}
          onClick={()=>{
            if(document.getElementById('platformInput').value === ''){
              return
            }
            let prevPlatforms =[]
            if(addedPlatforms){
              addedPlatforms.map((elem)=>{
                prevPlatforms.push(elem)
              })
              
            }
            if(prevPlatforms.includes(midlePlatform)){
              alert('Esta plataforma ya esta agregada, intenta con una diferente')
              return
            }
            setPlatforms([...prevPlatforms,midlePlatform])
            document.getElementById('platformInput').value = '';
          }}>
            Add Platforms
          </button>
        </div>


        
        <div className = { styles.GenresContainer}>
          {addedPlatforms === null? null:
          addedPlatforms.map((elem)=>{
            return (
              <div key={addedPlatforms.indexOf(elem)} className={styles.addedPlatforms} onClick={()=>{
                  let borrar = addedPlatforms.filter(platform=>platform !== elem)
                  setPlatforms(borrar)
                  
                }}>
                {elem}
              </div>
              
            )
          })}
        </div>



        <textarea id='description'
        maxLength='250' placeholder = 'Description'
        className ={description !== 'complete' ?styles.DescriptionError: styles.Description}
        onChange={(e)=>{
          formChange(e,setDescription)
        }}/>
        


        <select 
          className={addedGenres.length>0? styles.Genres: styles.GenresError}
          onChange={(e)=>{
            let prevGenres=[]
            if(addedGenres){
              prevGenres.push(...addedGenres)
            }
            if (prevGenres.includes(e.target.value)){
              console.log(addedGenres);
              alert('Ese genero ya esta agregado, intenta con uno diferente')
              return
            }
            setAddedGenres([...prevGenres,e.target.value])
          }}>
            <option selected='selected' disabled='disabled' >
              Genres
            </option>
            {genres.data.map((elem)=>{
              return(
                <option key={genres.data.indexOf(elem)} > 
                  {elem.name} {elem.id}
                </option>
              ) 
            })}
        </select>



        <div className = {styles.GenresContainer}>
          {addedGenres=== null?null:addedGenres.map((elem)=>{
            return(
            <div  key={addedGenres.indexOf(elem)} className={styles.addedGenres}  onClick={()=>{
              let borrar= addedGenres.filter((genre => genre!== elem))
              setAddedGenres(borrar)
            }}>
              {elem}
            </div>
            )
          })}
        </div>



        <button className ={ Complete()?styles.Submit: styles.NotSubmit}
        onClick={()=>request()}
        >
            Submit
        </button>



      </div>
    </div>}
    </>
  )
}

export default AddGame