#!/bin/bash
now_date=`date +%s`
mongodump --out=/db/backup/$now_date --collection=notes --db=lab3   # create backup
scp -r /db/backup/$now_date/ root@$1:/db/backups   # send to backup server