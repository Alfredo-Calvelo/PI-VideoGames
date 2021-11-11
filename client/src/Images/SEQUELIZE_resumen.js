// 								SEQUELIZE






// LA DOCUMENTACION DE SEQUELIZE ES MARAVILLOSA

// Instalar: 	npm install --save sequelize
// 			npm install --save pg pg-hstore

const{Sequelize, DataTypes, Op} = require('sequelize')
//					|
//					|
//					|
//		Importamos los tipos de datos para rellenar las tablas


//Conectarnos a la base de datos (la base de datos ya tiene que estar creada)

const sequelize = new Sequelize('postgres://nombre_de-usuario:contraseña@host_donde_se_va_a_correr:5432/nombre_base_de_datos',{
	logging:false // esto lo que hace es que no se me imprima en la terminal un 
	//monton de datos a la hora de conectarse a la DB
})

//Tambien se puede hacer de la siguiente manera:

const sequelize = new Sequelize('nombre de la base de datos', 'username', 'contraseña',{
	host: 'localhost',
	dialect: 'postgres'
});


// para ver si la conexion fue exitosa puedo hacer asi:
sequelize.authenticate().then(()=>console.log('succes')).catch(e=>console.log(e))
//luego ejectuo el codigo con node y veo que sale por consola



						//MODELOS ====> Son las tablas que queremos tener en nuestra DB

//Crear modelos
//sequelize.define('nombre del modelo', atributos, options)
//						|
//						|	
const User = sequelize.define('User',{
	firstName:{
		type: DataTypes.STRING,
		primaryKey:true //Si quiero que este dato sea la primary key hago esto y listo
	},
	lastName:{
		type:DataTypes.STRING
	},
	city:{
		type: DataTypes.STRING,
		allowNull: false, // No puede ser Nulll = NOT NULL
		unique:true  // No se puede repetir
	},
	birthday:{
		type: DataTypes.DATEONLY,
		defaultValue: DataTypes.NOW,// Esto le colola un valor default a 
												//birthday con el dia de hoy si es que  no se le ingresa nada
	},
	pais:{
		type: DataTypes.ENUM('Colombia','Mexico','Argentina')
		//Con el ENUM digo que solo acepta los elementos definidos dentro del parentesis (values)
	},
	nombre_Completo:{
		type:DataTypes.VIRTUAL,
		get(){
			return `${this.firstName} ${this.lastName}`
		}
		// Este campo no se guarda en la DB
		// Payer.nombre_Completo ====> Devuelve: firstName + lastName
	},
},{
	//estas son las opciones para crear la tabla, la cual se crea con dos columnas
	//que se llaman createdAt y updatedAt
	timestamps:true, // aca le digo que si quiero las columnas de tiempo, si pongo false no se crean
	createdAt: "creado", //aca puedo cambiar el nombre predefinido de la columna
	updatedAt: false // si le pongo false la columna no se crea
})

//la base de datos todavia no esta sincronizada, al terminar de crear todos mis 
//modelos tengo q sincronizar el JS a la DB, NO ANTES

sequelize.sync()// esto crea la tabla si no existe y si ya existe no hace nada
sequelize.sync({force:true})// esto elimina la tabla y la vuelve a crear, si habia info la pierdo
sequelize.sync({alter:true})// aplica los cambios necesarios para que la tabla
							// actual coincida con el modelo si perder informacion




//									MODULARIZACION DE MODELOS DE TABLAS

// En un archivo nuevo

const {DataTypes} = require('sequelize')
module.exports = sequelize => { // defino el modulo (tabla) como una funcion flecha la cual recibe a 'sequelize' como parametro
	const User = sequelize.define('User',
	{
	firstName:{
		type: DataTypes.STRING,
		primaryKey:true //Si quiero que este dato sea la primary key hago esto y listo
	},
	lastName:{
		type:DataTypes.STRING,
		get(){
			return `Mi apellido es ${this.getDataValue('lastName')}`// La funcion get sirve para cuando hago un select
																  // este dato (lastName ahora), aparece como la funcion lo retorna
																  // pero no se afecta realmente en la tabla 
																  // pero para obtener el dato
																  // que corresponde a donde lo estoy definiendo debo
																  // hacer this.getDataValue(nombrePropiedad)

		},
		set(value){
			this.setDataValue('firstName', `hola como te va ${value}`)
		}, // lo que hace la funcion set es almacenar el dato de la forma que se pasa en el segundo parametro de setDataValue
		   // y a la funcion le llega por parametro (value) el dato que esta por ser guardado
		validate:{
			//aca puedo hacer validaciones para la base de datos ,buscar las validaciones en internet.
			//tambien puedo definir funciones las cuales reciben por parametro el dato que se esta queriendo ingresar
			// si esta arroja un error el dato no ingresa

		}
	},
	city:{
		type: DataTypes.STRING,
		allowNull: false, // No puede ser Nulll = NOT NULL
		unique:true  // No se puede repetir
	},
	birthday:{
		type: DataTypes.DATEONLY,
		defaultValue: DataTypes.NOW,// Esto le colola un valor default a 
												//birthday con el dia de hoy si es que  no se le ingresa nada
	},
	pais:{
		type: DataTypes.ENUM('Colombia','Mexico','Argentina')
		//Con el ENUM digo que solo acepta los elementos definidos dentro del parentesis (values)
	},
	nombre_Completo:{
		type:DataTypes.VIRTUAL,
		get(){
			return `${this.firstName} ${this.lastName}`
		}
		//Payer.nombre_Completo ====> Devuelve: firstName + lastName
	},
	},
	{
		timestamps:false
	});
};


// Luego en el archivo principal hago lo siguiente:
const{Sequelize} = require('sequelize')
const User = require('aca va la ruta al archivo del modulo'); // Aca importo el modulo como una funcion
const { get, template } = require('lodash');
const { Hash } = require('crypto');
const { monitorEventLoopDelay } = require('perf_hooks');
User(sequelize); 'Finalmente importo la funcion del modulo para que se cree'





//  							AGREGAR FILAS A LA BASE DE DATOS:
 

const Alfredo = User.build({firstName:'Alfredo'})
await Alfredo.save() 

//Estos dos pasos lo que haen es crear la fila con los datos cargados, y luego en el save lo sincroniza con la DB
// Usando este metodo podemos modificar el objeto recibido por el cliente anftes de sincronizar

const Alfredo = await User.create({firstName:'Alfredo'})

// Este paso lo que hace es crear la fila y sincronizarlo automaticamente en el mismo paso
// Usando este metodo no podemos modificar el objeto antes de sincronizar


const usuario = User.findAll()// devuelve un arreglo de objetos con todas las filas de la tabla, en este caso todos los Users


const usuario = User.findAll({
	where:{firstName: 'Alfredo'}, // En el where va la condicion para que te traiga solo una columna
								 // en este caso seria un usuario, el nombre de la propiedad dentro del where
								 // debe ser la misma que esta en la tabla
	

	attributes:["fisrtName",'lastName'], // Acota mas lo que te devuelve la funcion, traeria del 
										 // usuario que tenga el primer nombre 'Alfredo' 
										 // SOLAMENTE el firstName y el lastName
})


const usuario = User.findAll({
	where:{
		[Op.and]:[
			{firstName:name},
			{lastName:apellido},// Aca lo que hace es poner una condicion doble, con el Op.and
								// El Op lo tengo que requerir desde sequelize
		]
	}
})

const usuario = User.findByPk(id)// aca lo que hace busca un usuario por clave primaria, deberia estar definida alguna Pk en la table


const usuario = User.findOne({
	where:{firstName :'Alfredo'} // trae solo el primer usuario que coincida con el nombre Alfredo, null si no lo encuentra
})


const [usuario, created] = User.findOrCreate({
	where:{nombredeUsuario},
	defaults:{
		firstName:'Alfredo',
		lastName:'Calvelo'
	}
})//Busca un usuario, si no lo encuentra lo crea y coloca la constante Created en true

let usuario = User.update({// en la variable usuario se guardan cuantos Usuarios fueron actualizados
	firstName:'Alfredo' // Modifica la tabla a este valor, cambia el firstName a 'Alfredo'
},{
	where:{firstName:'Rocio'}// La tabla es modificada en los campos que coincida con el firstName = 'Rocio'
})

User.destroy({
	where:{firstName:'Afredo'}
})//borra la fila de la talba que coincida con el registro, si ningua coincide borra todas las filas
//Esta funcion no devuelve nada, asi que no conviene asignarla a una variable o constante




//											CONEXIONES ENTRE TABLAS

// Esto debe hacerse en el archivo de base de datos padre, no el el archivo de los modelos
// UNO A UNO :
Foo.hasOne(Bar);
Bar.belongsTo(Foo);

// UNO A MUCHOS:
Team.hasMany(Player);
Player.belongsTo(Team);

// MUCHOS A MUCHOS:
Movie.belongsToMany(Actor,{through:'Nombre de la tabla'})
Actor.belongsToMany(Movie, {through:'Nombre de la tabla'}) // ambas tablas deben tener el mismo nombre
														   // y ambas lineas deben existir para que funcione la relacion