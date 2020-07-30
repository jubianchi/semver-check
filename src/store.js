import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { VERSION, CONSTRAINT } from './actions';
import semver from './semver';
import history from './history';

const initialState = {
    version: { version: '', semver: null },
    constraint: { constraint: '', semver: null },
};

const version = (state = { version: '', semver: null }, action) => {
    if (action.type === VERSION) {
        const cleaned = semver.coerce(action.version);

        return {
            ...state,
            version: action.version,
            semver: cleaned,
        };
    }

    return state;
};

const constraint = (state = { constraint: '', semver: null }, action) => {
    if (action.type === CONSTRAINT) {
        const cleaned = semver.cleanRange(action.constraint);

        return {
            ...state,
            constraint: action.constraint,
            semver: semver.coerceRange(cleaned),
        };
    }

    return state;
};

const reducers = combineReducers({
    router: connectRouter(history),
    version,
    constraint,
});

const enhancers = [applyMiddleware(routerMiddleware(history), thunk)];

if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

export default createStore(reducers, initialState, compose(...enhancers));
