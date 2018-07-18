FROM php:7.1.2-apache
COPY php.ini /usr/local/etc/php/
RUN docker-php-ext-install pdo_mysql
RUN service apache2 restart