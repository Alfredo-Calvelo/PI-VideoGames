require('dotenv').config();
const { default:axios } = require('axios')
let {Router} = require('express');
const {Videogame, Relacion} = require('../db.js')
var router = Router()

router.post('/',async function(req, res, next){
try{
  let {name, rating, description, platforms, released} = req.query
    const newGame = await Videogame.create({
      name,
      released,
      rating,
      description,
      platforms
    })
    let {id} = newGame.dataValues // ID del videojuego
    let genresId = req.query.genres.map((elem)=>{ // IDs de los generos
      let arr  = elem.split(' ')
      return parseInt(arr[arr.length -1])
    });
    let videogame = await Videogame.findByPk(id)
    await videogame.addGenres(genresId)
    console.log(genresId);
    console.log(videogame);
    let cosas = await Relacion.findAll()
    console.log(cosas);
    res.send('Videogame Add Successfully')

    
  } catch (error) {

    console.log(error);
    if(error.original.detail.includes('Ya existe la llave (name)')){
      res.send('Ese nombre ya existe, pruebe con uno diferente')

    }

  } 
})

module.exports = router