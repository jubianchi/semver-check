import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import ReactGA from 'react-ga';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

ReactDOM.render(
    <StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </StrictMode>,
    document.getElementById('root')
);

if (process.env.NODE_ENV !== 'production') {
    ReactGA.initialize('UA-56445984-1', {
        debug: false
    });
    ReactGA.ga('send', 'pageview');
}

registerServiceWorker();
