-- Eliminar las tablas si ya existen para evitar conflictos. / Delete the tables if they already exist to avoid conflicts.
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS products CASCADE;

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

-- Crear tabla 'users'. / Create table 'users'.
CREATE TABLE users (
    id_user SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'regular' CHECK (role IN ('admin', 'regular')),
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insertar datos en 'users'. / Insert data into ‘users’.
INSERT INTO users (full_name, email, password, role) VALUES
('Esteban Garzón', 'ee.garzon@example.com', 'hashed_password1', 'admin'),
('Luis Pérez', 'luis.perez@example.com', 'hashed_password2', 'regular'),
('María López', 'maria.lopez@example.com', 'hashed_password3', 'regular');

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

-- Crear tabla 'clients'. / Create table 'clients'.
CREATE TABLE clients (
    id_client SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    document VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insertar datos en 'clients'. / Insert data into 'clients’.
INSERT INTO clients (full_name, document, email) VALUES
('Carlos Ruiz', '12345678A', 'carlos.ruiz@example.com'),
('Laura Torres', '87654321B', 'laura.torres@example.com'),
('Jorge Martínez', '11223344C', 'jorge.martinez@example.com');

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

-- Crear tabla 'products'. / Create table 'products'.
CREATE TABLE products (
    id_product SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    value NUMERIC(10,2) NOT NULL CHECK (value >= 0),
    stock INTEGER NOT NULL DEFAULT 0,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insertar datos en 'products'. / Insert data into ‘products’.
INSERT INTO products (name, description, value, stock) VALUES
('Laptop', 'Laptop marca XYZ con 16GB RAM y 512GB SSD', 1200.00, 10),
('Smartphone', 'Smartphone modelo ABC con cámara de 48MP', 700.00, 25),
('Monitor', 'Monitor 24 pulgadas Full HD', 150.00, 30);

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

-- Crear tabla 'orders'. / Create table 'orders'.
CREATE TABLE orders (
    id_order SERIAL PRIMARY KEY,
    id_client INTEGER NOT NULL REFERENCES clients(id_client) ON DELETE CASCADE,
    total NUMERIC(10,2) NOT NULL CHECK (total >= 0),
    created_at TIMESTAMP DEFAULT NOW()
);

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

-- Crear tabla 'order_products'. / Create table 'order_products'.
CREATE TABLE order_products (
    id_order INTEGER NOT NULL REFERENCES orders(id_order) ON DELETE CASCADE,
    id_product INTEGER NOT NULL REFERENCES products(id_product) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    subtotal NUMERIC(10,2) NOT NULL CHECK (subtotal >= 0),
    PRIMARY KEY (id_order, id_product)
);
