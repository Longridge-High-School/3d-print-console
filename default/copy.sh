#!/bin/sh

if [ ! -f  "/data/printers.json" ];
then
    cp /defaults/printers.json /data/printers.json
    chmod 776 /data/printers.json
fi

if [ ! -f  "/data/cameras.json" ];
then
    cp /defaults/cameras.json /data/cameras.json
    chmod 776 /data/cameras.json
fi

if [ ! -f  "/data/widgets.json" ];
then
    cp /defaults/widgets.json /data/widgets.json
    chmod 776 /data/widgets.json
fi

if [ ! -f  "/data/config.json" ];
then
    cp /defaults/config.json /data/config.json
    chmod 776 /data/config.json
fi

if [ ! -f  "/logs/log.txt" ];
then
    touch /logs/log.txt
    chmod 776 /logs/log.txt
fi

mkdir /data/widgets
chmod -R 776 /data/widgets
chmod 777 /data/widgets