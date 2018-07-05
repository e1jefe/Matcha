FROM php:7.1.2-apache 
RUN docker-php-ext-install pdo_mysql
COPY php.ini /usr/local/etc/php/
COPY arbuz.conf  /etc/apache2/sites-available/
COPY apache2.conf /etc/apache2
ADD rewrite.load /etc/apache2/mods-available/rewrite.load
RUN ln -s /etc/apache2/mods-available/rewrite.load /etc/apache2/mods-enabled/rewrite.load
RUN service apache2 restart
