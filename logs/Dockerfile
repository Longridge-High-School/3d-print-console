FROM php:8.0-apache

EXPOSE 80

ADD ./index.php /var/www/html/index.php
RUN chmod +rw /var/www/html/index.php
ADD ./htaccess /var/www/html/.htaccess
RUN chmod +rw /var/www/html/.htaccess

RUN mkdir /data
RUN touch /data/log.txt
RUN chmod 666 /data/log.txt

RUN a2enmod headers
RUN service apache2 restart