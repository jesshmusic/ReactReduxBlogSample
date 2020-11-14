This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

# Blog Code Test

This app uses React along with Redux to create the blog. Axios is utilized for RESTful calls to the API. 

**_NOTE_**: _I think there is a cross origin issue with the Rails backend. I believe I have properly set up the API requests to work with a Rails backend, but I am getting either `404` or `422` errors. The `404` only happens on editing an article, any other POST, DELETE, or PUT requests are a `422` or a `CORS` error. Because I had setup this app with Redux from the start, it would have required a lot of additional time to switch to local storage. I can rebuild it that way if you all would like, but I thought you might want to at lease see the code with Redux._

## Running Cypress tests

After starting the local development with `yarn start`, in a separate terminal window run `yarn run cypress open`.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`
_I don't use this test suite_

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
