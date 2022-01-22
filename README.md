# Storefront Backend Project

In order to run this repo, you need to install:
 1. Node.JS 
 2. npm
 3. PostgresSQL

- To begin using this application, you need to create two databases: one for developing and another for testing. 

## How to run 

Follow these steps: 
1. Clone this repo
2. Inside the main directory, create `.env` file and fill it as the following example:
```
PORT=3000
POSTGRES_HOST=127.0.0.1
POSTGRES_DB_DEV=storefront_db_dev
POSTGRES_DB_TEST=storefront_db_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=1234
ENV=dev
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

