// Importamos las dependencias principales de Sequelize. / Importing Sequelize core dependencies.
import { DataTypes, Model } from 'sequelize';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Importamos la instancia de conexión configurada con nuestra base de datos. / We import the connection instance configured with our database.
import sequelize from '../dbconfig/connection.ts';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Definimos la clase para el modelo `Product`. / We define the class for the `Product` model.
export class Product extends Model {
    declare id_product: number;
    declare name: string;
    declare description: string;
    declare value: number;
    declare stock: number;
    declare deleted_at: Date | null;
    declare created_at: Date;
}

// Inicializamos el modelo `Product` utilizando el método `init()` de Sequelize. / We initialize the `Product` model using Sequelize's `init()` method.
Product.init(
  {
    id_product: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
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
    tableName: 'products',  // ← Asignamos un nombre a la tabla. / We assign a name to the table
    timestamps: false       // ← En caso de ser 'true', convierte los nombres de las columnas a snake_case. / If ‘true’, convert column names to snake_case.
  }
);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Exportamos nuestro modelo. / We export our model.
export default Product;
