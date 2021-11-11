require('dotenv').config();
const { default:axios } = require('axios')
let {Router} = require('express')
var router = Router()
const {YOUR_API_KEY} = process.env
const {Videogame, Relacion, Genres} = require('../db.js')



// Obtener todos los juegos
router.get('/',function(req,res,next){
    let arr =[]
    let url=`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`

    //esta funcion carga el array a devolver con los datos, hago un destructuring de los datos que necesito asi no cargo el front por demas
    let cargar = respuesta => {
        respuesta.data.results.map(elemento=>{
            let{slug,id,name,rating,background_image, genres, released,platforms} = elemento
            arr.push({slug,id,name,released,background_image, rating,
                DB: false,
                genres:genres.map(elem=>{return {
                    id:elem.id,
                    name:elem.name,
                }}),
                platforms: platforms.map(elem=>{return {
                    id:elem.platform.id,
                    name:elem.platform.name,

                }})
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

        let DbGames= (await Videogame.findAll({
            attributes:['DB','id', 'name', 'released', 'rating','description','platforms','background_image']
        }))
        
        if(DbGames.length >0){
            
            await Promise.all (DbGames.map(async(elem)=>{
                let relations = await Relacion.findAll({
                    where:{videogameId:elem.dataValues.id}
                })

                let genresid= relations.map(elem=>{
                    return elem.dataValues.genreId
                })
                let genres =[]
                await Promise.all( genresid.map( async elem=>{
                    let filter = await Genres.findAll({
                        where:{id:elem}
                    })

                    genres.push({
                        id: filter[0].dataValues.id,
                        name:filter[0].dataValues.name
                    })

                }))
                console.log(genres);
                let obj={...elem.dataValues,genres}
                arr.push(obj)
            }))
        }
        console.log(arr);
            res.send(arr)
        

    }
        hacer();
    
})

module.exports = router