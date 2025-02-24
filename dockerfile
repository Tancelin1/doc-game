FROM node:18

# Installer dpkg et fakeroot
RUN apt-get update && \
    apt-get install -y dpkg fakeroot

# Copier le projet
WORKDIR /app
COPY . .

# Installer les dépendances et effectuer le build
RUN npm install

# Exécuter la commande de build
CMD ["npm", "run", "build"]
