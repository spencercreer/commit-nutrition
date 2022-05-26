<div style="display: flex; justify-content: center;">
<img src="" width="600">
</div>

____


![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

## Description

COMMIT Nutrition is a MERN application built for meal planning. While most nutrition apps are focused on tracking, COMMIT Nutrition is focused on planning. Users can create recipes and meals that they regularly eat and use them to make meal plans.

## Table of Contents
* [Links](#links)
* [Animation](#animation)
* [Installation](#installations) 
* [Tests](#tests)
* [Dependencies](#dependencies)  
* [Contribute](#contribute) 
* [License](#license)
* [Contact](#contact)

## Links
Published URL: [https://commit-nutrition.herokuapp.com/](https://commit-nutrition.herokuapp.com/)

Repository: [https://github.com/spencercreer/meal-planner](https://github.com/spencercreer/meal-planner)

## Animation
The following animation demonstrates the application functionality:<br>
![COMMIT Nutrition walkthrough](./assets/commit_nutrition.gif)

## Installation
This application utilizes the following [dependencies](#dependencies).

After cloning the repo, install the necessary dependencies by running the following command:
  ```
  npm install
  ```
This application is setup to use MySQL database management system. If you do not have MySQL installed, you may install it [here](https://dev.mysql.com/downloads/mysql/).
Once you have MySQL installed, you will need to create a .env file with the following credentials:
  ```
  DB_NAME=math_quiz_db
  DB_USER=<mysql user>
  PASSWORD=<user password>
  ```
Set up the your local database by logging into MySQL in a terminal window and running the schema.sql file. When you log into MySQL, you will be prompted to enter your password.
  ```
  mysql -u <user> -p
  SOURCE db/schema.sql
  ```
You may seed your MySQL database with test data by running:
  ```
  npm run seeds
  ```
Once your local database is setup, you may start the application by running:
  ```
  npm start
  ```

## Tests
Tests are written using Jest. To run tests, start the server and run the following command:

  ```
  npm test
  ```
## Dependencies

This application utilizes the following dependencies:

|Dependency           |Version    |
|---------------------|-----------|
|express              |0.0.0      |
|dotenv               |0.0.0      |
|express-handlebars   |0.0.0      |
|handlebars           |0.0.0      |
|mysql2               |0.0.0      |
|sequelize            |0.0.0      |
|body-parser          |0.0.0      |

The following dev dependencies are also included:

|devDependency        |Version    |
|---------------------|-----------|
|jest                 |0.0.0      |
|nodemon              |0.0.0      |

## Contribute
Please submit a PR if you would like to contribute

## License
This project is licensed under the MIT license.

## Contact
For questions or comments, please contact me.

Email: <a href="mailto: spencercreer@gmail.com" target="_blank">spencercreer@gmail.com</a>

GitHub: [spencercreer](https://github.com/spencercreer/)
