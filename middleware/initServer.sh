#!/bin/bash

# install node pm2
# clone repo
# restore db 
# $name_lastbackup
# dowload lastbackup from ip_backup
scp -r root@192.168.1.85:/db/backups/name_lastbackup /data/backup
# mongorestore /data/backup/name_lastbackup
# run service

