FROM php:8.0-fpm
 
WORKDIR /var/www/html/web

RUN apt-get update && apt-get install -y curl unzip git
RUN docker-php-ext-install pdo_mysql mysqli
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY . .

RUN composer install