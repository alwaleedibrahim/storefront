# Storefront Backend Project

In order to run this repo, you need to install:
 1. Node.JS 
 2. npm
 3. PostgresSQL

- Create user using psql shell, for example: 
```
CREATE USER psql_user WITH PASSWORD 'psql123';
```
- To begin using this application, you need to create two databases: one for developing and another for testing:

```
CREATE DATABASE storefront_db_dev;
CREATE DATABASE storefront_db_test;
```
- Grant all privileges to user we just created:
```
GRANT ALL PRIVILEGES ON DATABASE storefront_db_dev TO psql_user;
GRANT ALL PRIVILEGES ON DATABASE storefront_db_test TO psql_user;
```
- Now you are ready to run project 

## How to run 

Follow these steps: 
1. Clone this repo
2. Inside the main directory, create `.env` file and fill it as the following example:
```
PORT=3000
POSTGRES_HOST=127.0.0.1
POSTGRES_DB_DEV=storefront_db_dev
POSTGRES_DB_TEST=storefront_db_test
POSTGRES_USER=psql_user
POSTGRES_PASSWORD=psql123
ENV=dev
SALT_ROUNDS=10
PEPPER=hAcK_mE_iF_yOu_CaN
TOKEN_SECRET=hello_world
```
2. Install dependancies: 
```
npm install
```
3. Run migrations:
```
npm run db-up
```
4. Start application
```
npm run start
```
- To run tests:
```
npm run test
``

