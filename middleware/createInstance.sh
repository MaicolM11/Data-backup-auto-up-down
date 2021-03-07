#!/bin/bash
# args 1- instance_name. 2- ip of instance. 3- name_lastbackup, 4. ip_bakcup
cd vagrant/
mkdir $1
cp `pwd`/Vagrantfile `pwd`/$1/
cd $1
ip=$(/sbin/ip -o -4 addr list wlp5s0 | awk '{print $4}' | cut -d/ -f1)
IP=$2 PATH_BACKUP="$3" IP_BACKUP=$4 ROUTE_MIDDLE="http://$ip:3000" vagrant up