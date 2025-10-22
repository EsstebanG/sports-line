// Importamos las librerías y funciones que iremos utilizando. / We import the libraries and functions that we will be using.
import dotenv from 'dotenv'; // ← Importamos la librería para las variables de entorno. / We import the library for the environment variables.
dotenv.config(); // ← Cargamos las variables del archivo .env / We load the variables from the .env file.

import express from 'express' // ← Importamos la librería de express para el servidor. / We import the express library for the server.

import sequelize from './dbconfig/connection.ts' // ← Importamos nuestra variable de la conexión. / We import our connection variable.

import { router, initRoutes } from './routers/cleaner.ts';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Importamos el middleware de CORS creado manualmente. / We import the manually created CORS middleware.
import { corsMiddleware } from './middlewares/cors.middleware.ts' // ← Importamos nuestra configuración de CORS. / We import our CORS configuration.

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  

const app = express() // ← 

const PORT = process.env.PORT || 3001 // ← Creamos o usamos una variable donde definimos el puerto. / We create or use a variable where we define the port.

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  

app.use(express.json()) // ← ←

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  

// Middlewares.
app.use( corsMiddleware ); // ← ← Usamos globalmente nuestro CORS personalizado. / We use our custom CORS globally.

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  

// Enrutamiento dinamico. 
await initRoutes();

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  

// Inicializamos nuestro servidor y nuestra conexión a base de datos. / We initialize our server and our database connection.
app.listen(PORT, () => { 
    sequelize; // ← 

    console.log(`Server initialized on port: ${PORT} 🚀...`);
});