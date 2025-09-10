#!/bin/sh
set -e

echo "Running migrations and collecting static files..."
python manage.py collectstatic --noinput
python manage.py migrate --noinput

echo "Starting Gunicorn..."
exec "$@"