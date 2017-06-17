//import io from 'socket.io-client';
import reducer from './reducer';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import remoteActionMiddleware from './remote_action_middleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(
    applyMiddleware(remoteActionMiddleware, thunk)
));

export default store;