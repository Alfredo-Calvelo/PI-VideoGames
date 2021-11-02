require('dotenv').config();
const { default:axios } = require('axios')
let {Router} = require('express')
var router = Router()
const {YOUR_API_KEY} = process.env


// Obtener todos los juegos
router.get('/',function(req,res,next){
    let arr =[]
    let url=`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`

    //esta funcion carga el array a devolver con los datos, hago un destructurin de los datos que necesito asi no cargo el front por demas
    let cargar = respuesta => {
        respuesta.data.results.map(elemento=>{
            let{name,rating,background_image, genres, released,platforms} = elemento
            arr.push({name,released,background_image, rating, 
                genres:genres.map(elem=>{return elem.name}),
                platforms: platforms.map(elem=>{return elem.platform.name})
            })
        })
    }

    // esta async function hace la consulta a la api, actualiza la url para traer los siguientes 20 juegos, e invoca a la funcion cargar
    async function consultar (link){
        let respuesta = await axios(link)
        url =  respuesta.data.next
        cargar(respuesta)

    }

    // esta async function invoca 5 veces a la consultora para asi traer los primeros 100 juegos y cargarlos en el array
    // una vez terminado ese proceso la funcion da una respuesta hacia 
    async function hacer (){
        for (let i = 0; i < 5; i++) {
            await consultar(url)
        }
        res.send(arr)
        console.log(arr.length);



    }
        hacer();
    
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