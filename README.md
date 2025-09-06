# 🗓️ nextsesh

A simple session planning tool. Targeted toward climbers, usable by everyone.
Current features include:

1. **🕓 Scheduling**: Schedule your next sessions


---


## 📚 Table of Content

- [📌 Notes](#-notes)
- [📎 General](#-setup)
  - [🌿 Branches](#-branches)
  - [🧰 Services](#-services)
- [🛠 Setup](#-setup)
  - [📦 Dependencies](#-dependencies)
  - [📄 .env Files](#env-files)
    - [🔑 Django Secret](#-django-secret)
  <!-- - [🔄 CI/CD](#-ci/cd) -->
- [📝 Usage](#-local-usage)
  - [🔧 Database Changes](#-database-changes)
  - [🎛️ Django Admin](#-django-admin)
- [🚀 Deployment](#-deployment)


## 📌 Notes

> 📘 Project State
> 
> The project is currently in pre-alpha.
> `main` does contain the MVP but is deplyed as a static info website only.

> 🚧 Bugs, Crashes & Missing features
>
> The project is in a very early alpha stage.
> Thus, there may be repeated bugs or crashes.
> Most features are still missing.


## 📎 General

### 🌿 Branches

- `main`: The main branch is production-ready. It is pulled by the production servers and deployed on push.
- `alpha`: The alpha branch is testing-ready. It is pulled by the production servers and deployed on push. Should be mostly production ready.
- `dev`: The development branch merges new features. Formatting, linting and run tests are performed.
- `alpha-dev`: The alpha development branch merges new features for testing phase.
- `feature/*`: The feature branches manage the development process. Eventually merged into `dev` or `alpha-dev` once completed.

Merge requests must only merge into `dev`. The `main` branch is only updated by merges from `dev`.

### 🧰 Services

- Frontend Deployment: A combination of Cloudflare [Pages](https://pages.cloudflare.com/) and [Workers](https://workers.cloudflare.com/) allows for automated deployments.
- Backend Deployment: We use [Coolify](https://coolify.io/) to manage our backend deployments.
- User Management: To manage users we rely on [Auth0](https://auth0.com/).


## 🛠 Setup

### 💾 Install Project
Clone the git repo as usual.

```bash
git clone git@github.com:benedictdaske/nextsesh.git
```

Make sure you have installed uv for Python dependencies and npm for TypeScript dependencies.

### 📦 Dependencies
[npm](https://github.com/npm) manages the frontend dependencies. To install, run the following command:

```bash
cd frontend && npm install
```

[uv](https://github.com/astral-sh/uv) manages all backend dependencies. To install, run the following command:

```bash
cd backend && uv sync
```

### 📄 .env Files 

There are several .env.sample files in the project. 
To get started, simply `cp .env.sample .env` in the corresponding directory and then specify the missing information between the quotation marks.

- `.env` in the `frontend` folder
- `.env` in the `backend` folder

#### 🔑 Django Secret

To generate a Django Secret Key for your Database use this command with your python environment activated:

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

Then copy the random string as `DJANGO_SECRET_KEY` into the backend `.env`.

<!-- ### 🪝 Pre-commit hooks

We use pre-commit to ensure the code quality locally. The package pre-commit will be installed with poetry's dev dependencies. To install the pre-commit hooks, run the following command:

```bash
poetry run pre-commit install
```

### 🔄 CI/CD

We use GitHub Actions for CI/CD. The pipeline is defined in `.github/workflows/python-ci.yml`. It checks the code formatting with `black`, the import order using `isort` and lints it with `flake8`. If the Pipeline fails, please manually run `black .`, `isort .` and `flake8` to see the errors and fix them locally. We recommend using black and isort on save, so you don't have to worry about it.
Another option is to set up the pre-commit hook, which will run the checks before every commit. -->


## 📝 Local Usage

To start the frontend use `npm run dev` inside `/frontend`.

To run the backend server from `/backend` use

```bash
python manage.py runserver
```

### 🔧 Database Changes

When making changes to the DB models or setup you need to apply and then start the backend once more. Use

```bash
python manage.py makemigrations
python manage.py migrate
```

### 🎛️ Django Admin

To create an admin user that is allowed access to the django admin panel use

```bash
python manage.py createsuperuser
```


## 🚀 Deployment

When merging `dev` into `main` or `alpha-dev` into `alpha` Cloudflare Pages will automatically build and deploy the new frontend setup. Meanwhile, Coolify will do the same for the backend server. 
 