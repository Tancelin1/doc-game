FROM node:18

# Installer dpkg et fakeroot
RUN apt-get update && apt-get install -y dpkg fakeroot

# Installer les dépendances du projet
WORKDIR /app
COPY . .
RUN npm install

# Commande de build
CMD ["npm", "run", "build"]
