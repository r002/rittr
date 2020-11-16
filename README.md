# Rittr (Robert's Twitter Clone Pet Project)

[Operation Rittr Kanban](https://github.com/r002/rittr/projects/2)

November 15, 2020 - Sunday: This current build **only** works in Google Chrome and will not
work in Microsoft Edge or IE because those browsers don't support **EventSource**.

June 27, 2020 - Saturday: Test 'Continuous Delivery' with GitHub Deploys integration.

```sh
$ heroku apps:info
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
$ $env:PGPASSWORD = 'dummy_pass_here'
$ $env:PGCLIENTENCODING='utf-8'  # So emojis will show in the psql CLI for "select * from edicts;"

$ psql -U rittr rittr_dev

# Load db from seed:
$ cmd /c 'psql -U rittr rittr_dev < db/seed.sql'

# Dump to seed from db:
$ pg_dump -U rittr rittr_dev > snapshot.sql

$ npm install node-fetch --save-dev

```