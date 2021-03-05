#!/bin/bash

# install dependencies
apt update
sudo apt-get install -y linux-headers-$(uname -r) build-essential dkms
apt install -y nodejs 
apt install -y curl
curl https://www.npmjs.com/install.sh | sudo sh
apt install -y git
npm install pm2 -g
sudo apt-get install -y sshpass

# install mongodb https://linuxize.com/post/how-to-install-mongodb-on-debian-10/

sudo apt install -y dirmngr gnupg apt-transport-https software-properties-common ca-certificates curl
curl -fsSL https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
sudo add-apt-repository 'deb https://repo.mongodb.org/apt/debian buster/mongodb-org/4.2 main'
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl enable mongod --now