# ---------- Stage 1: Build ----------
FROM python:3.13-slim AS build

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PIP_ROOT_USER_ACTION=ignore

WORKDIR /app

RUN apt-get update && apt-get install -y \
build-essential \
curl \
&& rm -rf /var/lib/apt/lists/*

COPY pyproject.toml uv.lock* /app/

RUN pip install --upgrade pip \
&& pip install uv \
&& uv sync --frozen   # installs into /app/.venv

COPY . /app/

RUN .venv/bin/python manage.py collectstatic --noinput


# ---------- Stage 2: Runtime ----------
FROM python:3.13-slim AS runtime

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PIP_ROOT_USER_ACTION=ignore

WORKDIR /app

RUN apt-get update && apt-get install -y \
curl \
&& rm -rf /var/lib/apt/lists/*

# Copy the virtual environment from build stage
COPY --from=build /app/.venv /app/.venv

# Make sure venv is always used
ENV PATH="/app/.venv/bin:$PATH"

COPY --from=build /app /app

EXPOSE 8001

CMD ["gunicorn", "nextsesh.wsgi:application", "--bind", "0.0.0.0:8001", "--workers", "3", "--threads", "2"]
