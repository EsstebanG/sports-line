# Imagen base de Node.js (versión LTS)
FROM node:20-alpine

# Establecer directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Instalar globalmente nodemon para desarrollo
RUN npm install -g nodemon

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto
EXPOSE 3001

# Comando por defecto (modo desarrollo con nodemon)
CMD ["npm", "run", "dev"]
