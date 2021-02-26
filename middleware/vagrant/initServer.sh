#!/bin/bash

# install dependencies
apt update
apt install -y nodejs npm
apt install -y git
npm install pm2 -g

# install mongodb https://linuxize.com/post/how-to-install-mongodb-on-debian-10/


# restore database
scp -r root@$2:/db/backups/$1 /data/backup
mongorestore /data/backup/$1

# download repo
git clone https://github.com/MaicolM11/lab3.git
cd server
npm install
pm2 start ecosystem.config.js