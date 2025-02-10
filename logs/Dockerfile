FROM php:8.0-apache

EXPOSE 80

RUN apt update -y
RUN apt install wget -y
RUN wget -O /var/www/html/index.php https://raw.githubusercontent.com/Longridge-High-School/3d-print-console/refs/heads/main/logs/index.php
RUN chmod +rw /var/www/html/index.php
RUN echo "Header set Access-Control-Allow-Origin \"*\"" >> /var/www/html/.htaccess
RUN chmod +rw /var/www/html/.htaccess

RUN mkdir /data
RUN touch /data/log.txt
RUN chmod 666 /data/log.txt

RUN a2enmod headers
RUN service apache2 restart