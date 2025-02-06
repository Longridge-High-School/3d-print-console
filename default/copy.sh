#!/bin/sh

if [ ! -f  "/data/printers.json" ];
then
    cp /defaults/printers.json /data/printers.json
fi

if [ ! -f  "/data/cameras.json" ];
then
    cp /defaults/cameras.json /data/cameras.json
fi

if [ ! -f  "/data/config.json" ];
then
    cp /defaults/config.json /data/config.json
fi