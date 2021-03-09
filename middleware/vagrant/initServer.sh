#!/bin/bash

# permission 
sudo cat /dev/zero | ssh-keygen -q -N ""
sudo sshpass -p "123" ssh-copy-id -o StrictHostKeyChecking=no root@$2

# restore database
sudo mkdir -m 777 /db
scp -r root@$2:/db/backups/$1 /db
mongorestore /db/$1

# download repo
git clone https://github.com/MaicolM11/lab3.git
cd lab3/server
npm install
sudo pm2 startup
sudo PORT=3000 IP_BACKUP=$2 ROUTE_MIDDLE="$3" URL_DB='mongodb://127.0.0.1:27017/lab3' pm2 start index.js
sudo pm2 save