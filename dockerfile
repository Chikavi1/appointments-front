# Usar la imagen oficial de Node.js como base
FROM node:14

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install
RUN npm install -g @angular/cli

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto
EXPOSE 4200

# Comando para iniciar el servidor
CMD ["ng", "serve" ,"--host", "0.0.0.0"]
