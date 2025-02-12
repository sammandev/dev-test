# OT App

This project is an overtime management application with a Django backend and a Vue.js frontend.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
    1. [Directory Layout](#directory-layout)
3. [API Endpoints](#api-endpoints)
    1. [Employees (`/api/employees/`)](#employees-api)
    2. [Projects (`/api/projects/`)](#projects-api)
    3. [Overtime Requests (`/api/overtime-requests/`)](#overtime-requests-api)
4. [How to Run the Project](#how-to-run-the-project)
    1. [With Docker](#with-docker)
    2. [Manual Setup](#manual-setup)
        1. [Backend](#backend-setup)
        2. [Export Overtime Requests Data](#export-overtime-requests-data)
        3. [Frontend setup](#frontend-setup)
5. [Production Deployment Plan](#production-deployment-plan)
6. [License](#license)

## Prerequisites
- [Node](https://nodejs.org/en/download) 22.12.0 or above
- [PM2](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/) (Process manager for Node.js)
- [Python](https://www.python.org/downloads/) 3.11.0 or above
- [Pip](https://pip.pypa.io/en/stable/installation/) 24.0 or above
- [Python Virtual Environment](https://packaging.python.org/en/latest/tutorials/installing-packages/#creating-and-using-virtual-environments)
- [PostgreSQL](https://www.postgresql.org/download/) 14 or above
- [Docker](https://docs.docker.com/get-started/)

## Project Structure
The project is divided into two main parts:

1. **Backend**: A Django application located in the `backend/` directory.
2. **Frontend**: A Vue.js application located in the `frontend/` directory.

### Directory Layout

```
/.../OT_app/
├── backend/
│   ├── api/
│   │   ├── utils/
│   │   │   └── excel_generator.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── ...
│   ├── backend/
│   │   ├── settings.py
│   │   └── ...
│   ├── generate_data/
│   │   ├── generate_employee.py
│   │   ├── generate_project.py
│   │   └── ...
│   ├── manage.py
│   ├── requirements.txt
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── layouts/
│   │   │   ├── overtime/
│   │   ├── composables/
│   │   ├── ...
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── ...
│   │   ├── views/
│   │   │   └── OvertimeFormView.vue
│   ├── ...
│   ├── package.json
│   ├── vite.config.js
│   └── ...
├── data/
│   └── excel/
├── README.md
└── ...
```

## API Endpoints

### Employees (`/api/employees/`)

- `GET /api/employees/` - List all employees
- `GET /api/employees/{id}/` - Retrieve specific employee
- `POST /api/employees/` - Create new employee
- `PUT /api/employees/{id}/` - Update specific employee
- `PATCH /api/employees/{id}/` - Employee partial update
- `DELETE /api/employees/{id}/` - Delete specific employee

### Projects (`/api/projects/`)

- `GET /api/projects/` - List all projects
- `GET /api/projects/{id}/` - Retrieve specific project
- `POST /api/projects/` - Create new project
- `PUT /api/projects/{id}/` - Update specific project
- `PATCH /api/projects/{id}/` - Project partial update
- `DELETE /api/projects/{id}/` - Delete specific project

### Overtime Requests (`/api/overtime-requests/`)

- `GET /api/overtime-requests/` - List all overtime requests
- `GET /api/overtime-requests/{id}/` - Retrieve specific overtime request
- `POST /api/overtime-requests/` - Create new overtime request
- `POST /api/overtime-requests/export_files/` - Generate Excel files
- `POST /api/overtime-requests/export_json/` - Generate JSON file
- `PUT /api/overtime-requests/{id}/` - Update specific overtime request
- `PATCH /api/overtime-requests/{id}/` - Request partial update
- `DELETE /api/overtime-requests/{id}/` - Delete specific overtime request



## How to Run the Project
Before running the project, you must prepare environment files for `backend` and `frontend`. Use `.env.example` to create `.env.dev` and `env.prod` files and customize them.
- For `backend`:
    ```sh
    cd backend/
    cp .env.example .env.dev
    cp .env.example .env.prod
    ```
- For `frontend`:
    ```sh
    cd frontend/
    cp .env.example .env.dev
    cp .env.example .env.prod
    ```
    Use the `copy` command instead of `cp` if you are using Windows.
        

- ## With Docker
    - ### Development environment:
        - Backend:
        ```sh
        cd backend/
        docker compose up --build
        ```
        - Frontend:
        ```sh
        cd frontend/
        npm run docker:dev
        ```
    - ### Production environment:
        - Backend:
        ```sh
        cd backend/
        docker compose -f docker-compose.prod.yml up --build
        ```
        - Frontend:
        ```sh
        cd frontend/
        npm run docker:prod
        ```


- ## Manual Setup
- ### Backend

    The backend is a Django application located in the `backend/` directory.

    1. Create python virtual environment:
        ```sh
        cd backend/
        python -m venv venv
        ```

    2. Activate the virtual environment:
        - On Windows:
            ```sh
            venv\Scripts\activate
            ```
        - On macOS/Linux:
            ```sh
            source venv/bin/activate
            ```

    3. Install the dependencies:
        ```sh
        pip install -r requirements.txt
        ```

    4. Database migrations:

        Before running these commands, make sure you already set the database environment (`backend/backend/settings.py` > `DATABASES` )

        - Makemigrations:
            ```sh
            python manage.py makemigrations api
            ```
        - Migrate:
            ```sh
            python manage.py migrate
            ```

    5. Generate data:
        - Employees data:
            ```sh
            python generate_data/generate_employee.py
            python manage.py loaddata generate_data/employees.json
            ```
        - Projects data:
            ```sh
            python generate_data/generate_project.py
            python manage.py loaddata generate_data/projects.json
            ```
        - Overtime Request dummy data:
            
            If you don't specify the number, it will default to generating 10 records.

            ```sh
            python manage.py generate_overtime_dummy 20
            ```

    6. Running commands:
        - Start app for Development:
            ```sh
            set DJANGO_ENV=development && python manage.py runserver
            ```
        - Start app for Production:
            ```sh
            set DJANGO_ENV=production && python manage.py runserver
            ```

- ### Export Overtime Requests Data

    - #### JSON
        To export overtime requests to a JSON file, you can use the `export_to_json` method in the `OvertimeRequest` model.
        json will be exported into `/.../OT_app/data/` directory

    - #### Excel
        To export overtime requests to a xls file, you can use the `ExcelGenerator` method
        json will be exported into `/.../OT_app/data/excel/` directory


- ### Frontend setup

    The frontend is a Vue.js application located in the frontend directory.

    1. Install node module dependencies:
        ```sh
        cd frontend/
        npm install
        ```

    2. Running commands:
        - For Development:
            ```sh
            npm run dev
            ```
        - For Production Build:
            ```sh
            npm run build
            ```
        - For Production Preview:
            ```sh
            npm run preview:prod
            ```

        - ### Run App with PM2
            - For Development:
            ```sh
            npm run start:dev
            ```
            - For Production:
            ```sh
            npm run start:prod
            ```

        - #### Vite Customize Configuration
            See [Vite Configuration Reference](https://vite.dev/config/).

        - #### PM2 Customize Configuration
            See [Process Manager 2 Referemce](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/).


    3. To use Process Manager (`pm2`) for production deployment:
        - Build and start application:
            ```sh
            npm run deploy
            ```
        - Monitor your application:
            ```sh
            npm run monitor
            ```
        - View logs:
            ```sh
            npm run logs
            ```
        - Restart application:
            ```sh
            npm run restart
            ```
        - Stop application:
            ```sh
            npm run stop
            ```
        
- ## Production Deployment Plan
    - Production Deployment Steps:
        ```sh
        # Install dependencies
        npm ci

        # Build and deploy
        npm run deploy:prod

        # Check status
        npm run deploy:status

        # Monitor logs
        npm run deploy:logs

        # Reload application (zero-downtime)
        npm run deploy:reload
        ```
    - Make the `deploy.sh` script executable:
        ```sh
        chmod +x deploy.sh
        ```
    - Run deployment:
        ```sh
        ./deploy.sh
        ```

## License

This project is licensed under the [MIT License](https://github.com/sammandev/dev-test/blob/main/LICENSE).
