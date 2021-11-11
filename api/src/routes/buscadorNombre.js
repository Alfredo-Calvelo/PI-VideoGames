require('dotenv').config();
const { default:axios } = require('axios')
let {Router} = require('express')
var router = Router()
const {YOUR_API_KEY} = process.env

router.get('/:nombre', function(req,res,next){
    let arr =[]
    let url=`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`
    // res.send(req.params.nombre)
    let cargar = respuesta => {
        respuesta.data.results.map(elemento=>{
            let{slug,name,rating,background_image, genres, released,platforms} = elemento

            arr.push({slug,name,released,background_image, rating, 
                genres:genres.map(elem=>{return elem.name}),
                platforms: platforms.map(elem=>{return elem.platform.name})
            })
        })
    }

      // esta async function hace la consulta a la api, actualiza la url para traer los siguientes 20 juegos, e invoca a la funcion cargar
    //Si esta funcion falla devuelve un string con la falla
    async function consultar (link){
        try{
            let respuesta = await axios(link)
            cargar(respuesta)
            url =  respuesta.data.next
        }
        catch(e){
            res.send('No se pudo acceder a la api')
        }
    }

    // esta async function invoca 5 veces a la consultora para asi traer los primeros 100 juegos y cargarlos en el array
    // una vez terminado ese proceso la funcion da una respuesta hacia 
    async function hacer (){
        for (let i = 0; i < 5; i++) {
            await consultar(url)
        }
        let arrReturn = []
        arr.map(elem=>{elem.slug.includes(req.params.nombre.toLowerCase())?arrReturn.push(elem):null})
        if(arrReturn.length === 0){
            res.send('Not Found')
        }else{
            res.send(arrReturn.slice(0,15))
        }



    }
    hacer();
})

module.exports = router