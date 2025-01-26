# Use PHP with necessary extensions
FROM php:8.2-fpm

# Install required dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    zip unzip git curl \
    && docker-php-ext-install pdo pdo_pgsql

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy application
COPY . .

# Install Laravel dependencies
RUN composer install

# Set permissions for Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port
EXPOSE 9000

# Set the entrypoint script =
# COPY ./docker/backend/entrypoint.sh /usr/local/bin/entrypoint
# RUN chmod +x /usr/local/bin/entrypoint

# Run entrypoint script
ENTRYPOINT ["entrypoint"]
