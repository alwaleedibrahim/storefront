# Requirements

## Database Realtions
![database schema](https://raw.githubusercontent.com/alwaleedibrahim/storefront/master/readme_images/schema.png)

## Database Tables

### Users table

| Column Name | Data Type |
| --- | --- |
| id | SERIAL PRIMARY KEY |
| firstName | VARCHAR(100) NOT NULL |
| lastName | VARCHAR(100) NOT NULL |
| password | VARCHAR NOT NULL |

### Orders Table

| Column Name | Data Type |
| --- | --- |
| id | SERIAL PRIMARY KEY |
| status | VARCHAR NOT NULL |
| user_id | BIGINT REFERENCES users(id) |


### Products Table

| Column Name | Data Type |
| --- | --- |
| id | SERIAL PRIMARY KEY |
| name | VARCHAR NOT NULL |
| price | REAL NOT NULL |

### Order_Product Table

| Column Name | Data Type |
| --- | --- |
| id | SERIAL PRIMARY KEY |
| order_id | BIGINT REFERENCES orders(id) |
| product_id | BIGINT REFERENCES products(id) |
| quantity | INTEGER |
