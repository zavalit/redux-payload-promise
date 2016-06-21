import expect from 'expect';
import promoseMiddleware from '../';

const INIT_ACTION = 'INIT_ACTION';
const SAMPLE_ACTION = 'SAMPLE_ACTION';

function metaMiddleware() {
  return next => action => {
    return action.type === INIT_ACTION
      ? next({ ...action, meta: 'meta called' })
      : next(action);
}
  }


const payloadAction = (opts) => ({
  ...opts,
  payload: new Promise((resolve) => resolve(true)),
  type: SAMPLE_ACTION,
});

function dispatch(action) {
  const methods = { dispatch };
  return metaMiddleware()(promoseMiddleware(methods)({type:INIT_ACTION}))(action);
}


describe('promise middleware', (done) => {
  it('resolve promise', () => {

    dispatch(payloadAction({ opt: 'is here' })).then(
      output => {

        console.log(output)
      }
    );
  });


});
