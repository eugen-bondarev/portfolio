# FROM alpine:3.18.2
FROM php:8.0-fpm

RUN apt-get update && apt-get install -y curl unzip git default-mysql-client python3 python3-pip
RUN docker-php-ext-install pdo_mysql mysqli
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
RUN chmod +x wp-cli.phar
RUN pip install Flask
EXPOSE 8080

COPY . .

# CMD ["while true; do echo 1; sleep 5; done;"]

# CMD ["flask", "--app", "main", "run"]

# CMD ["ls"]
CMD ["python3", "main.py"]