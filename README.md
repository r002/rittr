# node-js-getting-started

[Operation Rittr Kanban](https://github.com/r002/rittr/projects/2)

June 27, 2020 - Saturday: Test 'Continuous Delivery' with GitHub Deploys integration.

```sh
$ heroku ps:scale web=0
$ heroku ps:scale web=1

$ cmd /c 'heroku pg:psql --app app_name < db/seed.sql'
$ cmd /c 'heroku pg:psql < db/seed.sql'

$ heroku logs --tail
$ heroku pg:psql

$ git commit -m "r002/rittr#6: Add 'users' table, install pg node module, attach pg add-on to Heroku."

$ git log origin/master..HEAD
$ git diff origin/master..HEAD

$ ls env:  # Show all env vars in PowerShell
$ $env:PGPASSWORD = 'myPwdSecret'

$ psql -U rittr rittr_dev

# Load db from seed:
$ cmd /c 'psql -U rittr rittr_dev < db/seed.sql'

# How to dump/load to/from psql:
$ pg_dump -U rittr rittr_dev > snapshot.sql
$ cmd /c 'psql -U rittr rittr_dev < snapshot.sql'

$ npm install node-fetch --save-dev

```

REST API Reference: https://medium.com/hashmapinc/rest-good-practices-for-api-design-881439796dc9

https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses

Stored procedures: https://www.postgresqltutorial.com/postgresql-create-procedure/


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
