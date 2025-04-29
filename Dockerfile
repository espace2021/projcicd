# Utiliser une image officielle Node.js basée sur Linux
FROM node:18

# Définir le dossier de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json en premier (pour le cache)
COPY package*.json ./

# Installer les dépendances dans le conteneur
RUN npm install

# Copier tout le reste (y compris app.js)
COPY . .

# Exposer le port de ton app (ici 3001)
EXPOSE 3001

# Lancer l'application
CMD ["node", "app.js"]

