FROM php:fpm
RUN apt-get update \
	&& apt-get install -y -q --no-install-recommends \
		ssmtp \
	&& apt-get clean \
	&& rm -r /var/lib/apt/lists/*
FROM php:7.1.2-apache
ADD php.ini /etc/php/php.ini
COPY arbuz.conf  /etc/apache2/sites-available/
COPY apache2.conf /etc/apache2
ADD rewrite.load /etc/apache2/mods-available/rewrite.load
RUN ln -s /etc/apache2/mods-available/rewrite.load /etc/apache2/mods-enabled/rewrite.load
RUN docker-php-ext-install pdo_mysql
RUN service apache2 restart
#COPY php.ini /usr/local/etc/php/