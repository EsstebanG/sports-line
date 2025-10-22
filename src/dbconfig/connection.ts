// Importamos la librería para las variables de entorno. / We import the library for the environment variables.
import dotenv from 'dotenv';

// Cargamos las variables del archivo .env / We load the variables from the .env file.
dotenv.config();

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Importamos la librería de Sequelize. / We import the Sequelize library.
import { Sequelize } from 'sequelize'

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Creamos una instancia de Sequelize para la conexión. / We create a Sequelize instance for the connection.
const sequelize = new Sequelize (
    process.env.DB_NAME || "sports_line",   // ← Nombre de nuestra base de datos. / Name of our database.
    process.env.DB_USER || "postgres",      // ← Usuario de nuestro gestor de base de datos. / User of our database manager.
    process.env.DB_PASSWORD || "Qwe.123*",      // ← Contraseña de nuestra base de datos. / Password for our database.
    {
        host: process.env.DB_HOST || "localhost",   // ← La dirección del host donde se encuentra PostgreSQL. / The host address where PostgreSQL is located.
        port: 5432,                                 // ← El puerto de nuetsro PostgreSQL. / Our PostgreSQL port.
        dialect: "postgres",                        // ← El dialecto de la base de datos. Aquí estamos usando PostgreSQL. / The database dialect, in this case PostgreSQL.
        logging: false                              // ← Desactivamos los logs para evitar que se impriman los queries de SQL. / We disable logging to avoid printing SQL queries.
    } 
);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Usamos una función asincrónica para esperar la respuesta de la base de datos. / We use an async function to wait for the database response.
(async () => {
    try {
        await sequelize.authenticate(); // ←
        
        console.log("Connected to PosgreSQL with Sequelize. ✔️");
    } catch (error) {
        console.error("An error has occurred in the connection. ❌", error);
    };
})();

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Exportamos la variable que contiene nuestra conexión. / We export the variable that contains our connection.
export default sequelize;