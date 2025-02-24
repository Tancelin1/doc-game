FROM node:18

# Installer dpkg et fakeroot
RUN apt-get update && apt-get install -y dpkg fakeroot
