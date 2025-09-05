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
- [📝 Usage](#-usage)
  - [🪂 Database connection and execution](#-database-connection-and-execution)
  - [⚛ Rest API for development purposes](##-rest-api-for-development-purposes)
    - [🔗 Endpoints](###-endpoints)
- [🚀 Deployment](#-deployment)


## 📌 Notes
- currently in pre-alpha
- MVP only
- starting alpha development


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
- Backend Deployment: [Coolify](https://coolify.io/) is connected the Frontend Deployment using a Cloudflare [Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/).


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



<!-- 
## 🪝 Pre-commit hooks

We use pre-commit to ensure the code quality locally. The package pre-commit will be installed with poetry's dev dependencies. To install the pre-commit hooks, run the following command:

```bash
poetry run pre-commit install
```

## 🔄 CI/CD

We use GitHub Actions for CI/CD. The pipeline is defined in `.github/workflows/python-ci.yml`. It checks the code formatting with `black`, the import order using `isort` and lints it with `flake8`. If the Pipeline fails, please manually run `black .`, `isort .` and `flake8` to see the errors and fix them locally. We recommend using black and isort on save, so you don't have to worry about it.
Another option is to set up the pre-commit hook, which will run the checks before every commit.

# 📝 Usage

Within the root folder run


```bash
export PYTHONPATH="../:./"
```

now, to run the backend server

```bash

poetry run uvicorn  websocket.app:app --port 8080 --host localhost
```


## 🪂 Database connection and execution

for execution, simply `cp .env.sample .env` in `hana/` and change `AIRMS_USERNAME` and `AIRMS_PASSWORD` to your Mount Sinai Credentials


## ⚛ Rest API for development purposes

1. Start the Backend Server (see at "Running the Backend Service") and NER as well as LLM applications if needed
2. Send post request to the according routes you need for your purpose
   The following example request (via terminal) gets a list of entities with concepts for the nlq that is provided:

```bash
curl -X POST http://localhost:8080/ner -H "Content-Type: application/json" -d "{\"nlq\": \"Show me a list of patients over 60 years old who have been diagnosed with hypertension.\"}"
```

### 🔗 Endpoints

1. 🧬 **Health Check** `GET /liveness`: Returns a status message indicating the health of the API.
   This endpoint is used to verify the health of the API. It should return a status message indicating that the API is operational.

2. 📖 **Named Entity Recognition (NER)** `POST /ner`: Processes a natural language query to extract named entities and concepts.
   This endpoint processes a natural language query to extract named entities and associated concepts. It returns the extracted entities along with the original text of the query.

   - Parameters:
     - `data (dict)`: A dictionary containing the natural language query under the key `nlq`.
   - Returns:
     - `dict`: A dictionary containing two keys: `ner_entities` (list of dictionaries representing entities with associated concepts) and `text` (original text of the query as processed by the NER module).

3. ⚙️ **SQL Generation (Base)** `POST /sql_base`: Converts a natural language query into SQL without NER.
   This endpoint converts a natural language query into SQL without utilizing NER. It directly generates SQL based on the input query.

   - Parameters:
     - `data (dict)`: A dictionary containing the natural language query under the key `nlq`.
   - Returns:
     - `dict`: A dictionary containing the key `sql`, with its value being the SQL query generated from the natural language input.

4. 🔭 **SQL Generation (with Concepts)** `POST /sql_concepts`: Converts a natural language query into SQL with NER.
   This endpoint converts a natural language query into SQL while utilizing NER to identify relevant concepts. It returns the SQL query along with the extracted entities and associated concepts.

   - Parameters:
     - `data (dict)`: A dictionary containing the natural language query under the key `nlq`.
   - Returns:
     - `dict`: A dictionary containing two keys: `sql` (SQL query generated from the natural language input) and `ner_entities` (list of dictionaries representing entities with associated concepts).

5. 🐢 **Full Data Pipeline** `POST /full_pipeline`: Executes the full data processing pipeline from NLQ to SQL generation, and potentially to data retrieval.
   This endpoint executes the complete data processing pipeline, including NLQ processing, NER, entity linking, and SQL conversion. It provides the SQL query, processed named entities, and placeholder for data retrieval.
   - Parameters:
     - `data (dict)`: A dictionary containing the natural language query under the key `nlq`.
   - Returns:
     - `dict`: A dictionary containing the SQL query (`sql`), the processed named entities (`ner_entities`), and the data rows retrieved by executing the SQL (`data`). Currently, data retrieval is an empty list pending the completion of database connection functionality.


# 🚀 Deployment

When merging `dev` into `main` the pipeline will automatically build the docker image and push it to the docker hub. The production server will then pull the image and restart the container. 
  -->