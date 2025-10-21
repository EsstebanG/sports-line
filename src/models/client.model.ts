// Importamos las dependencias principales de Sequelize. / Importing Sequelize core dependencies.
import { DataTypes, Model } from 'sequelize';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Importamos la instancia de conexión configurada con nuestra base de datos. / We import the connection instance configured with our database.
import sequelize from '../dbconfig/connection.ts';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Definimos la clase para el modelo `Client`. / We define the class for the `Client` model.
export class Client extends Model {
    declare id_client: number;
    declare full_name: string;
    declare document: string;
    declare email: string;
    declare deleted_at: Date;
    declare created_at: Date;
}

// Inicializamos el modelo `Client` utilizando el método `init()` de Sequelize. / We initialize the `Client` model using Sequelize's `init()` method.
Client.init(
  {
    id_client: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    full_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    document: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
  },
  {
    sequelize,              // ← Aseguramos la conexión a la base de datos. / We secure the connection to the database.
    tableName: 'clients',   // ← Asignamos un nombre a la tabla. / We assign a name to the table
    timestamps: false       // ← En caso de ser 'true', convierte los nombres de las columnas a snake_case. / If ‘true’, convert column names to snake_case.
  }
);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Exportamos nuestro modelo. / We export our model.
export default Client;
