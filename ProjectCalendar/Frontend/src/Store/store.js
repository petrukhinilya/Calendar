import { applyMiddleware, createStore as _createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../Reducers/index';

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });
const createStore = () => _createStore(
  reducer,
 composeEnhancers(applyMiddleware(thunk))

);
const store = createStore();
export default store;