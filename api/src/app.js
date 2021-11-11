const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const {Genres} = require('./db.js')
const { default:axios } = require('axios');



require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

async function sincronizar(){
  console.log('Sinconizando la base de daton con los Generos de la Api');
  let res = await axios('https://api.rawg.io/api/genres?key=be2a4ee973c546c892ce706111abeab0')
  try {
    res.data.results.map(async(elem)=>{
      let genero =await Genres.create({
        id:elem.id,
        name:elem.name
      })
    })
    
  } catch (error) {
    console.log(error);
  }
  console.log('Sincronizacion Terminada');
  

}
sincronizar()

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
