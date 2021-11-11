require('dotenv').config();
let {Router} = require('express')
var router = Router()
const {Genres} = require('../db.js')


router.get('/', async function(req,res,next){
  try {
    const genres = await Genres.findAll()
    res.send(genres)
    
  } catch (error) {
    res.json(error)
  }



})

module.exports = router