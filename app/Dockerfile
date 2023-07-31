FROM php:8.0-fpm
 
RUN apt-get update && apt-get install -y curl unzip git default-mysql-client
RUN docker-php-ext-install pdo_mysql mysqli
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY . /var/www/files

WORKDIR /var/www/files

RUN composer install

WORKDIR /var/www/html

# RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
# RUN chmod +x wp-cli.phar
# CMD "ls"
# CMD "cp -a /var/www/files/. /var/www/html"
# CMD "cp -TRv /var/www/files /var/www/html"