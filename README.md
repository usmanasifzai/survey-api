### Survey API
Implemented the survey API to submit responses against each question with email and fetch all the user_responses


## Assumptions
- Each question will be submitted separately
- I have created a questions table structure in such a way that more questions can be added without any database changes and they can be handled with this format

## What can be done further
- Use some ORM like sequelize instead of directly using postgres-nodejs client
- Create api endpoint to create questions with their config.
- Dockerize the app


### Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

#Installing
>Install node
>nvm install v12.10.0

Database postgresql
>brew install postgres

Clone the repository

>git clone https://github.com/usmanasifzai/survey-api.git

>cd survey-api

> npm install


## Create database
 After installing postgres, run following commands to create database and tables required for this api. Run the same script for test database after creating test database and use this `PGDATABASE_TEST` for test database

> CREATE DATABASE survey-api;


Create required Table;


``` sql
CREATE table if not exists questions ( id serial PRIMARY KEY, title VARCHAR ( 200 ) UNIQUE NOT NULL, config JSONB, created_at timestamp NOT null DEFAULT now() );

CREATE table if not exists responses ( id serial PRIMARY KEY, value JSONB, created_at timestamp NOT null DEFAULT now(), email VARCHAR ( 50 ) NOT NULL, question_id int not null, FOREIGN KEY (question_id) REFERENCES questions(id));


Create questions with title and config

INSERT into questions (title, config)  values('How are you feeling after the session today?', '{ "type": "text", "limit": "1000" }'::jsonb);

INSERT into questions (title, config)  values('I feel better after the session than I did before', '{ "type": "boolean" }'::jsonb);

INSERT into questions (title, config)  values('How excited are you for your next session?', '{ "type": "radio", "options": ["extremely excited", "somewhat excited", "indifferent", "not excited at all"] }'::jsonb);

```

## Setup
- Update variables in .env file to connect with created database

#### Start Api
run following command

> npm start

Now the backend api is running at.
> http://localhost:3000/


- Run Test cases
> npm run test
## API Requests

- create survey/submit question response

> curl --location --request POST 'localhost:3000/surveys' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "abc@gmail.com",
    "questionId": 1,
    "answer": "text ansers"

}'


- get user_responses form submitted questions /user_responses

> curl --location --request GET 'localhost:3000/user_responses?email=abc@gmail.com' \
--header 'Content-Type: application/json' \
--data-raw ''


- Get created questions with config

> curl --location --request GET 'localhost:3000/questions'

> {
    "questions": [
        {
            "id": 1,
            "title": "How are you feeling after the session today?",
            "config": {
                "type": "text",
                "limit": "1000"
            },
            "created_at": "2021-12-09T18:49:32.401Z"
        },
        {
            "id": 2,
            "title": "I feel better after the session than I did before",
            "config": {
                "type": "boolean"
            },
            "created_at": "2021-12-09T18:49:32.401Z"
        },
        {
            "id": 3,
            "title": "How excited are you for your next session?",
            "config": {
                "type": "radio",
                "options": [
                    "extremely excited",
                    "somewhat excited",
                    "indifferent",
                    "not excited at all"
                ]
            },
            "created_at": "2021-12-09T18:49:32.401Z"
        }
    ]
}
