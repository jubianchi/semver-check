import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import { ConnectedRouter } from 'connected-react-router';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import history from './history';

ReactDOM.render(
    <StrictMode>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>
    </StrictMode>,
    document.getElementById('root'),
);

if (process.env.NODE_ENV !== 'production') {
    serviceWorker.unregister();
} else {
    ReactGA.initialize('UA-56445984-1', {
        debug: false,
    });
    ReactGA.ga('send', 'pageview');

    serviceWorker.register();
}
