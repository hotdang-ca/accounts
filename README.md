# Accounts

## What is it
Simple Accounts keeper. Mostly an example of how to run a [React](https://reactjs.org) front-end (particularily, [`create-react-app`](https://github.com/facebookincubator/create-react-app)) on top of an [Express](https://expressjs.com/) backend server.

`Express` parts live in `routes/` primarily, as well as `/app.js`. `React` parts live in `client/`. Mongoose Models in `models/`.

## Haven't I heard about this before?
Yup. This method is generally called [Isomorphic](https://medium.com/monitisemea/isomorphic-universal-javascript-496dc8c4341a) or [Universal](https://medium.com/@mjackson/universal-javascript-4761051b7ae9) Javascript, though this is an over-simplified example, and not quite either... yet. Essentially, this just keep the Express parts expressy, and the React parts reacty, but bundled as one application.

![mcdlt](https://vignette.wikia.nocookie.net/ronaldmcdonald/images/8/88/Mcdlt-w-ad.jpg/revision/latest/scale-to-width-down/250?cb=20150504023854)

Basically, so I don't have to use the very large and opinionated [M.E.R.N. Stack](http://mern.io/).

## Deploying

### Heroku
For deploying to Heroku using the Heroku CLI, see [this article](https://devcenter.heroku.com/articles/creating-apps). Briefly:

```
$ heroku create
... 
$ git push heroku master
...
```

You'll also want to set some ENV vars required by the app:
`DB_CONNECTION_STRING` and `DB_SESSIONS_CONNECTION_STRING`. You can set this in the Heroku App’s settings tab on Dashboard, or using the CLI:

```
heroku config:set DB_CONNECTION_STRING=<your MongoDB connection string for the data table>
heroku config:set DB_SESSIONS_CONNECTION_STRING=<your MongoDB connection string for the session table>

```

### Google App Engine
All GAE NodeJS apps require a `flex` config. Read up on the [Google App Engine Documentation for NodeJS Applications](https://cloud.google.com/appengine/docs/flexible/nodejs/download). Briefly:

- Specify env vars in `/env/env.yaml`:

```
env_variables:
  DB_CONNECTION_STRING: <your MongoDB connection string for the data table>
  DB_SESSIONS_CONNECTION_STRING: <your MongoDB connection string for the session table>
```
- Download and install the Google Cloud SDK
- Run `gcloud projects create`
- Run `gcloud app create`
- Configure billing on the GAE [Billing](https://console.cloud.google.com/projectselector/billing) page
- Run `gcloud app deploy`
- Wait 10-15 minutes; watch your console patiently for status
- Run `gcloud app browse`

### Anything else
See documentation for your platform and environment. Essentially, ensure the ENV vars are set.

## Blog articles
- [Create React App with an Express Backend](https://daveceddia.com/create-react-app-express-backend/) - Dave Ceddia
- [Create React App with Express in Production](https://daveceddia.com/create-react-app-express-production/) - Dave Ceddia
- [Isomorphic (Universal) JavaScript](https://medium.com/@mjackson/universal-javascript-4761051b7ae9) - Mehmetcan Gayber
- [Universal JavaScript](https://medium.com/@mjackson/universal-javascript-4761051b7ae9) - Michael Jackson 

## TODO
- ~~Database persistence (instead of in-Memory)~~ Done, with [Mongoose ORM](http://mongoosejs.com)
- Sharing your accounts list with others 

## LICENSE
Copyright (c) 2017 James Robert Perih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.