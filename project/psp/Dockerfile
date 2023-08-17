FROM node:14

WORKDIR /usr/src/app

# Copier le package.json et le package-lock.json (s'ils existent) pour optimiser l'installation des dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Installer Express
RUN npm install express

# Copier le reste de l'application
COPY . .

# Exposer le port sur lequel l'application écoute
EXPOSE 3000

CMD ["node", "server.js"]
