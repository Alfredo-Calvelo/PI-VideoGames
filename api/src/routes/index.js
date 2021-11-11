const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
let todos = require('./todos.js')
let buscadorNombre = require('./buscadorNombre.js')
let buscadorID = require('./buscadorID')
let agregar = require('./addGame.js')
let genres = require('./getGenres')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/todos', todos)
router.use('/buscarNombre',buscadorNombre)
router.use('/buscarID', buscadorID)
router.use('/AddGame', agregar)
router.use('/getGenres',genres)



module.exports = router;
