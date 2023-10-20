# ShortURL Generator

Welcome to ShortURL Generator, a simple application for creating shortcuts for your URLs.

## Synopsis

This project was carried out as part of our training at [École Supérieure du Digital](https://ecole-du-digital.com/) in Bordeaux. It is an API project, and our goal was to create an API in a group of two people. We chose to develop an API for creating shortened URLs.

_Why did we choose this project ?_ We are working in a company during our apprenticeship, and we often need to create shortened URLs. So, we decided to create an API that would allow us to generate shortened URLs, which we could use in our company.

## Authors

[Théo Gillet](https://github.com/theo-code33) and [Louis Bouet](https://github.com/1ouiss) completed this project in one week.

## Features

- User account creation
- API key generation
- Shortened URL generation
- Redirect to the original URL

## Technologies Used

### Frontend

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Backend

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- [Docker](https://www.docker.com/) installed on your machine

### Installation Steps

#### Backend Application Installation

1. Clone the repository from GitHub :

   ```sh
   git clone https://github.com/theo-code33/short-url-api.git
   ```

2. Navigate to the project directory :

   ```sh
   cd short-url-api
   ```

3. Create a .env file at the root of the project and add the following environment variables :

   ```sh
    # Environment variables for connecting to the database
    POSTGRES_PASSWORD=postgres
    POSTGRES_USER=postgres
    POSTGRES_DB=postgres

    # Secret key for JWT token generation
    JWT_SECRET=secret
   ```

4. Start your Docker containers :

   ```sh
    docker-compose up -d
   ```

5. Install dependencies :

   ```sh
   yarn
   ```

6. Start the application :

   ```sh
   yarn start:dev
   ```

##### Usage

To use API and create shorten url you need to register and login. After that you can create api key and use it to create shorten url. To use api key you need to add it to header as `x-api-key` and send it with request.

##### Documentation

We use swagger to document API. You can find it under `/documentation` route for official doc and under `/documentation-dev` for development doc.

If you want to use this API in local with the frontend application, you have to follow the next steps.

#### Frontend Application Installation

1. Clone the repository from GitHub :

   ```sh
   git clone https://github.com/theo-code33/short-url-app.git
   ```

2. Navigate to the project directory :

   ```sh
   cd short-url-app
   ```

3. Create a `.env` file at the root of the project and add the following environment variables:

   ```sh
    # Base URL of the application
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    # Environment variables for connecting to the API
    NEXT_API_URL=http://localhost:8000/api/v0
    # Environment variables for connecting to the API documentation
    NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. Install dependencies:

   ```sh
   yarn
   ```

5. Start the application:

   ```sh
   yarn dev
   ```

6. Access the application in your browser at [http://localhost:3000](http://localhost:3000).

## Documentation

Access the API developement documentation at [http://localhost:8000/documentation-dev](http://localhost:8000/api/v0/documentation-dev).

Access the API production documentation at [http://localhost:8000/documentation](http://localhost:8000/api/v0/documentation-dev).

## Operation

### Using the Interface

1. **Homepage**

   - Access the application through the browser at the `/admin` route.
   - Create a user account.

2. **Generating a Shortened URL**

   - Enter the long URL in the provided field.
   - Click the "Créer mon url" button.
   - You will receive a unique shortened URL associated with the original URL.

3. **Using the Shortened URL**

   - Copy the generated shortened URL.
   - Paste it into the browser to be redirected to the original URL.

### Using the API

1. **Creating an API Key**

   - Access the application through the browser at the `/admin` route.
   - Create a user account
   - Generate an API key.

2. **Generating a Shortened URL**

   - Send a POST request to the `/api/v0/url` URL with a JSON body containing the long URL.
   - You will receive a JSON response containing the unique shortened URL associated with the original URL.

## Licence

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/theo-code33/short-url-app">ShortURL Generator</a> by <span property="cc:attributionName">Théo Gillet & Louis Bouet</span> is marked with <a href="http://creativecommons.org/publicdomain/zero/1.0?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC0 1.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/zero.svg?ref=chooser-v1"></a></p>
