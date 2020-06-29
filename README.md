# node-js-getting-started

[Operation Rittr Kanban](https://github.com/r002/rittr/projects/2)

June 27, 2020 - Saturday: Test 'Continuous Delivery' with GitHub Deploys integration.

```sh
$ heroku ps:scale web=0
$ heroku ps:scale web=1

$ git commit -m "r002/rittr#6: Add 'users' table, install pg node module, attach pg add-on to Heroku."

$ heroku logs --tail
$ heroku pg:psql
```

```sql
create table users (id serial PRIMARY KEY, name text, email text);
insert into users (name, email) values ('Robert', 'robert@example.com');
```

A barebones Node.js app using [Express 4](http://expressjs.com/).

This application supports the [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone https://github.com/heroku/node-js-getting-started.git # or clone your own fork
$ cd node-js-getting-started
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
