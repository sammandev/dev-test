#!/bin/bash

set -eo pipefail

# Function to check postgres
check_postgres() {
    echo "Waiting for PostgreSQL..."
    while ! nc -z "${SQL_HOST}" "${SQL_PORT}"; do
        sleep 1
    done
    echo "PostgreSQL started"
}

# Function to apply migrations
apply_migrations() {
    echo "Applying database migrations..."
    python manage.py migrate --noinput
}

# Main execution
if [ "$DATABASE" = "postgres" ]; then
    check_postgres
fi

apply_migrations

if [ "$DJANGO_ENV" = "production" ]; then
    echo "Collecting static files..."
    python manage.py collectstatic --noinput --clear
    
    echo "Starting production server..."
    gunicorn backend.wsgi:application \
        --bind 0.0.0.0:1234 \
        --workers 3 \
        --threads 2 \
        --timeout 60 \
        --access-logfile - \
        --error-logfile -
else
    echo "Starting development server..."
    python manage.py runserver 0.0.0.0:1234
fi