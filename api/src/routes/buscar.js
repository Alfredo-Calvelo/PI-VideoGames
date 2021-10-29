require('dotenv').config();
const { default:axios } = require('axios')
let {Router} = require('express')
var router = Router()
const {YOUR_API_KEY} = process.env


// Obtener todos los juegos
router.get('',function(req,res,next){
    axios({
        method:'GET',
        url: `https://api.rawg.io/api/games?key=${YOUR_API_KEY}`
    }).then(respuesta => {
        res.send(respuesta.data)
        
        let {id,slug,name, background_image} =  respuesta.data.results[0]
        // destructuring para traer solo la info que me interesa
        console.log({id,slug,name,background_image});
    })
})

//Obtener juegos por nombre o por Id mediante params
router.get('/:GameName',  function(req,res,next){
    axios({
        method:'GET',
        url: `https://api.rawg.io/api/games/${req.params.GameName}?key=${YOUR_API_KEY}`
    }).then(respuesta => {
        res.send(respuesta.data)
    })
}) 
module.exports = router