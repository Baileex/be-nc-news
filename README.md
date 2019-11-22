# BE NC NEWS

The NC News repository is a RESTful API built using Node.js for both accessing and contributing topics, articles and comments. 

The hosted version can be viewed [here] (https://ncnewsjb.herokuapp.com/api)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

In order to run this project, the following prerequisites are required to be installed globally:

| Dependency | Version |
| ---------- | ------- |
| PostgreSQL | 12.1    |
| Node.JS    | 12.9.1  |
| NPM        | 6.10.3  |

The following developer dependencies will need to be installed:

| Dependency    | Version |
| ------------- | ------- |
| Express       | 4.17.1  |
| Knex          | 0.20.2  |
| Node Postgres | 7.12.1  |
| Chai          | 4.2.0   |
| Chai-Sorted   | 0.2.0   |
| Mocha         | 6.2.2   |
| Supertest     | 4.0.2   |

### Installing

This section details the steps to get the development environment up and running. 


Step 1: Clone the repository with the command: 

```
$ git clone https://github.com/Baileex/be-nc-news
```

Step 2: Open the repository in your preferred code editor e.g VSCode, Atom etc

Step 3: Navigate into the cloned repository, install the dependencies using the terminal command:

```
npm i
```

Step 4: Create a local `knexfile.js` file in the main directory and insert the below code:

```const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || "development";

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  }
};

const customConfig = {
  production: {
    connection: `${DB_URL}?ssl=true`,
  },
  development: {
    connection: {
      database: "nc_news"
      // username: only applicable if Linux User,
      // password: only applicable if Linux User 
    }
  },
  test: {
    connection: {
      database: "nc_news_test"
      // username: only applicable if Linux User,
      // password: only applicable if Linux User
    }
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };
```

NB: postGreSQL will require a username and password if you are running a linux system. If you are running on Mac OSX, you can remove the username and password keys from both development and test.

Step 5: Run the following terminal commands to set up your local test and development databases:

```
$ npm run setup-dbs
$ npm run seed
```

To see your databases you can run the command:

```
$ psql
\c nc_news_test
```

or 

```
$ psql -f queries.sql > output.txt

```

The above command with create an .txt file, displaying the tables and the data inserted.

## Running the tests

To test the endpoints locally and ensure that everything has been configured correctly use the command:

```
$ npm t
```
### Endpoints

The table below outlines the purpose of each test category, for additional details please review the `app.spec.js` file.



Endpoint                           | Request | Tests                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /api                               | GET     | Ensures that a JSON detailing the available endpoints and the requirements within each in served upon receiving a request.                                                                                                                                                                                                                              |
| /api/topics                        | GET     | Ensures that all topics are served. These are served as an array of each topic.                                                                                                                                                                                                                                                                         |
| /api/topics                        | POST    | Ensures that a new topic may be posted. An error is returned if the slug is less than 3 characters in length or a description is not provided.                                                                                                                                                                                                          |
| /api/users                         | GET     | Ensures that all users are served. These are served as an array of users.                                                                                                                                                                                                                                                                               |
| /api/users                         | POST    | Ensures that a new user may be posted. An error is returned if the username is less than 3 characters in length, or insufficient details are provided.                                                                                                                                                                                                  |
| /api/users/:username               | GET     | Ensures that details of the requested user are served. An error is returned if the requested user does not exist.                                                                                                                                                                                                                                       |
| /api/articles                      | GET     | Ensures that all articles are served in an array. Also ensures that the 6 valid queries (sort-by, order, author, topic, limit and page) function as intended, returning an error if an invalid value is provided, or a page requested that does not exist.                                                                                              |
| /api/articles                      | POST    | Ensures that a new article may be posted. An error is returned if either the topic or user posting the article do not exist.                                                                                                                                                                                                                           |
| /api/articles/:article_id          | GET     | Ensures that the correct article is displayed. An error is returned if the requested article ID does not exist or a non-integer is entered.                                                                                                                                                                                                             |
| /api/articles/:article_id          | PATCH   | Ensures that the requested changes are made to the article's vote property, serving the updated article. If additional keys are provided, they are ignored and an error is returned if a non-integer is entered as the value of inc_votes.                                                                                                              |
| /api/articles/:article_id          | DELETE  | Ensures that the specified article is deleted, along with any associated comments. An error is returned if the article ID does not exist or a non-integer is entered.                                                                                                                                                                                   |
| /api/articles/:article_id/comments | GET     | Ensures that all comments from the specified article are served. An error is returned if the requested article ID does not exist or a non-integer is entered. Also ensures that the 4 valid queries (sort-by, order, limit and page) function as intended, returning an error if an invalid value is provided, or a page requested that does not exist. |
| /api/articles/:article_id/comments | POST    | Ensures that a new comment is posted to the specified article, serving the complete new comment. Ensures an error is returned if an invalid or non-existent article ID is entered. Also ensures that an error is returned if insufficient data is received in the body of the request                                                                   |
| /api/comments/:comment_id          | PATCH   | Ensures that the requested changes are made to the comment's vote property, serving the updated comment. Ensures that if additional keys are provided, they are ignored and that an error is returned if a non-integer is entered as the value of inc_votes.                                                                                            |
| /api/comments/:comment_id          | DELETE  | Ensures the specified comment is deleted and that an error is returned if the specified comment does not exist or a non-integer is entered                                                                                                                                                                                                              |

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system


## Author

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)


## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
