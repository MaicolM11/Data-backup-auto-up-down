#!/bin/bash
# args 1- instance_name. 2- ip of instance. 3- name_lastbackup, 4. ip_bakcup
cd vagrant/
cp -rT `pwd`/template `pwd`/$1
cd $1
IP=$2 PATH_BACKUP="$3" IP_BACKUP=$4 vagrant up