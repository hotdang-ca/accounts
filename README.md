# Accounts

## What is it
Simple Accounts keeper. Mostly an example of how to run a [React](https://reactjs.org) front-end (particularily, [`create-react-app`](https://github.com/facebookincubator/create-react-app)) on top of an [Express](https://expressjs.com/) backend server.

`Express` parts live in `routes/` primarily, as well as `/app.js`. `React` parts live in `client/`.

## Haven't I heard about this before?
Yup. This method is generally called [Isomorphic](https://medium.com/monitisemea/isomorphic-universal-javascript-496dc8c4341a) or [Universal](https://medium.com/@mjackson/universal-javascript-4761051b7ae9) Javascript, though this is an over-simplified example, and not quite either... yet. Essentially, this just keep the Express parts expressy, and the React parts reacty, but bundled as one application.

![mcdlt](https://vignette.wikia.nocookie.net/ronaldmcdonald/images/8/88/Mcdlt-w-ad.jpg/revision/latest/scale-to-width-down/250?cb=20150504023854)

Basically, so I don't have to use the very large and opinionated [M.E.R.N. Stack](http://mern.io/).


## Blog articles
- [Create React App with an Express Backend](https://daveceddia.com/create-react-app-express-backend/) - Dave Ceddia
- [Create React App with Express in Production](https://daveceddia.com/create-react-app-express-production/) - Dave Ceddia
- [Isomorphic (Universal) JavaScript](https://medium.com/@mjackson/universal-javascript-4761051b7ae9) - Mehmetcan Gayber
- [Universal JavaScript](https://medium.com/@mjackson/universal-javascript-4761051b7ae9) - Michael Jackson 

## TODO
- Database persistence (instead of in-Memory)
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