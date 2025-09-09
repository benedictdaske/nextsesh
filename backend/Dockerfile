# Use a lightweight Python image compatible with Raspberry Pi 4
FROM python:3.13-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies needed to build Python packages
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy dependency definitions first to leverage Docker cache
COPY pyproject.toml uv.lock* /app/

# Install uv (for dependency management) and sync frozen dependencies
RUN pip install --upgrade pip \
    && pip install uv \
    && uv sync --frozen

# Copy the rest of the application code into the container
COPY . /app/

# Run Django management commands to prepare the app
RUN python manage.py collectstatic --noinput \
    && python manage.py migrate --noinput

# Expose port 8001 (optional, for documentation; not required for Cloudflare Tunnel)
EXPOSE 8001

# Start the Django API using Gunicorn with multiple workers
CMD ["gunicorn", "myproject.wsgi:application", "--bind", "0.0.0.0:8001", "--workers", "3", "--threads", "2"]
