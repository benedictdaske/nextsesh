# ---------- Stage 1: Build ----------
FROM python:3.13-slim AS build

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install system dependencies for building packages
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy dependency definitions first (for Docker cache)
COPY pyproject.toml uv.lock* /app/

# Install uv and sync dependencies directly into system Python
RUN pip install --upgrade pip \
    && pip install uv \
    && uv sync --frozen --system

# Copy the rest of the application
COPY . /app/

# Run Django build steps
RUN python manage.py collectstatic --noinput \
    && python manage.py migrate --noinput


# ---------- Stage 2: Runtime ----------
FROM python:3.13-slim AS runtime

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Copy installed dependencies from build stage
COPY --from=build /usr/local/lib/python3.13/site-packages /usr/local/lib/python3.13/site-packages
COPY --from=build /usr/local/bin /usr/local/bin

# Copy application code
COPY --from=build /app /app

# Expose port (documentation only)
EXPOSE 8001

# Run Gunicorn (multi-worker setup for Raspberry Pi)
CMD ["gunicorn", "myproject.wsgi:application", "--bind", "0.0.0.0:8001", "--workers", "3", "--threads", "2"]
