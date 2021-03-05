#!/bin/bash
now_date=`date +%s`
mongodump --out=/data/backup/$now_date --collection=notes --db=lab3   # create backup
scp -r /db/$now_date/ root@$1:/db/backups   # send to backup server