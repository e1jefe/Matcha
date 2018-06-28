FROM php:7.1.2-apache 
RUN docker-php-ext-install mysqli
COPY php.ini /usr/local/etc/php/
COPY arbuz.conf  /etc/apache2/sites-available/
RUN service apache2 restart
