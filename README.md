# 🗓️ nextsesh

A simple session planning tool. Targeted toward climbers, usable by everyone.
Current features include:

1. **🕓 Scheduling**: Schedule your next sessions


---

## 📚 Table of Content

- [🛠 Setup](#-setup)
  - [🌿 Branches](#-branches)
  - [📦 Poetry](#-poetry)
    - [🧪 Development](#-development)
  - [🪝 Pre-commit hooks](#-pre-commit-hooks)
  - [📄 .env Files](#env-files)
    - [🔑 JWT Secret](#-jwt_secret)
  - [🔄 CI/CD](#-ci/cd)
- [📝 Usage](#-usage)
  - [🪂 Database connection and execution](#-database-connection-and-execution)
  - [⚛ Rest API for development purposes](##-rest-api-for-development-purposes)
    - [🔗 Endpoints](###-endpoints)
- [🚀 Deployment](#-deployment)

# 🛠 Setup

## 🌿 Branches

- `main`: The main branch is production-ready. It is pulled by the production server. Should be production-ready.
- `dev`: The development the branch merges new features. Formatting, linting and run tests are performed.
- `feature/*`: The feature branches manage the development process. Eventually merged into `dev` once completed.

Merge requests must only merge into `dev`. The `main` branch is only updated by merges from `dev`.

## 📦 uv & npm

[uv](https://github.com/astral-sh/uv) manages all backend dependencies. To install dependencies, run the following command:

```bash
uv sync
```

[npm](https://github.com/npm) manages the frontent dependencies. To install dependencies, run the following command:

```bash
npm install
```
<!-- 
## 🪝 Pre-commit hooks

We use pre-commit to ensure the code quality locally. The package pre-commit will be installed with poetry's dev dependencies. To install the pre-commit hooks, run the following command:

```bash
poetry run pre-commit install
```
## 📄 .env Files 

There are several .env.sample files in the project. 
To get started, simply `cp .env.sample .env` in the corresponding directory and then specify the missing information between the quotation marks.

- `.env` in the root folder
- `.env` in the `hana` folder
- `.env` in the `llm` folder
- `.env` in the `ner/app` folder


### 🔑 JWT Secret

Generate a secret by running `python3 -m websocket.jwt_handler` and put it as `JWT_AUTH_SECRET` into the .env file.
Also add the JWT_AUTH_SECRET to the `.env` file in the `frontend` repository. 


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


## 🤖 LLM

We use the [LightLLM](https://github.com/ModelTC/lightllm) proxy to query Large Language Models for our Pipeline. Please make sure to have Docker installed and running.
To start the LLM Proxy, run

```bash
cd llm
docker compose up
```

## 🔍 NER

Please read the `ner/README.md` for more information on the NER service.
If you have modified the NER code, please rebuild the ner-docker-image.

start the service by running
  
  ```bash
  cd ner
  docker compose up
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