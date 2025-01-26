#!/bin/bash
set -e

echo "Waiting for database connection..."
until php -r "new PDO('pgsql:host=$DB_HOST;port=$DB_PORT;dbname=$DB_DATABASE', '$DB_USERNAME', '$DB_PASSWORD');" 2>/dev/null; do
  sleep 2
done

echo "Database connection established."

# Run Laravel commands
php artisan migrate --force
php artisan db:seed --force
php artisan jwt:secret --force

# Start PHP-FPM server
exec php-fpm
