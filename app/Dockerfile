FROM php:8.0-fpm
 
RUN apt-get update && apt-get install -y curl unzip git default-mysql-client
RUN docker-php-ext-install pdo_mysql mysqli
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY . /var/www/files

WORKDIR /var/www/files

RUN composer install

WORKDIR /var/www/html

RUN chown -R www-data:www-data /var/www

RUN mkdir /root/.ssh
RUN cat /keys/github | base64 -d > ~/.ssh/id_rsa
RUN cp /keys/github.pub ~/.ssh/github.pub
RUN chmod -R 400 ~/.ssh &&
RUN ssh-keyscan github.com >> ~/.ssh/known_hosts
RUN cd  git clone git@github.com:eugen-bondarev/linode-cluster-db-backup.git /var/www/linode-cluster-db-backup