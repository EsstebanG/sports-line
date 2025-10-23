// Importamos las dependencias principales de Sequelize. / Importing Sequelize core dependencies.
import { DataTypes, Model } from 'sequelize';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Importamos la instancia de conexión configurada con nuestra base de datos. / We import the connection instance configured with our database.
import sequelize from '../dbconfig/connection.ts';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Definimos la clase para el modelo `User`. / We define the class for the `User` model.
export class User extends Model {
    declare id_user: number;
    declare full_name: string;
    declare email: string;
    declare password: string;
    declare role: string;
    declare deleted_at: Date | null;
    declare created_at: Date;
    declare refresh_token?: string | null;
}

// Inicializamos el modelo `User` utilizando el método `init()` de Sequelize. / We initialize the `User` model using Sequelize's `init()` method.
User.init (
  {
    id_user: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    full_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(225),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'regular'),
        allowNull: false,
        defaultValue: 'regular'
    },
    refresh_token: {
        type: DataTypes.TEXT,
        allowNull: true
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
    sequelize,            // ← Aseguramos la conexión a la base de datos. / We secure the connection to the database.
    tableName: "users",   // ← Asignamos un nombre a la tabla. / We assign a name to the table
    timestamps: false     // ← En caso de ser 'true', convierte los nombres de las columnas a snake_case. / If ‘true’, convert column names to snake_case.
  }
);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Exportamos nuestro modelo. / We export our model.
export default User;