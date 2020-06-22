import { combineReducer, combineReducers } from 'redux'

import reducerF from './reducerF';

import reducerF2 from './reducerF2';

import reducerF3 from './reducerF3';

import reducerF4 from './reducerF4';

import reducerF5 from './reducerF5';

import reducerSuporteA from './reducerSuporteA';

import reducerSuporteA2 from './reducerSuporteA2';

import reducerSuporteB from './reducerSuporteB';

export default combineReducers({
  reducerF,
  reducerF2,
  reducerF3,
  reducerF4,
  reducerF5,
  reducerSuporteA,
  reducerSuporteA2,
  reducerSuporteB
});