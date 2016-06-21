# Redux Async Action Middleware

This redux middleware enables a dispatching of async actions.

## Usage
To use it in your project you have to provide it on your redux middleware stack:

```javascript
import promiseMiddleware from 'redux-payload-promise';
import { createStore, applyMiddleware } from 'redux';

const store = createStore(
  reducers,
  [ 'some provided state' ],
  applyMiddleware(promiseMiddleware)
);


and define an Action with object defined with a **payload** key, that refer to your async Promise.
For example:
```javascript
export const loadDataAction = (queryParams) =>
({
  type: LOAD_DATA,
  payload: loadPromise(queryParams),
});

```

in case of a successful Response it will be dispatched with a JSON object like this:
```javascript

{
  payload:"[object Promise]"
  result: {
    // your load data query result
  }
  success:true
}
```

in nonsuccessful case the ```success``` will be false.


You can chain as many dispatches as you want:
```javascript
dispatch(loadDataAction(queryParams))
        .then((output) => dispatch(filterResonse(JSON.parse(output.result))))
        .then(() => dispatch(sayEverythingIsFine()));

```
