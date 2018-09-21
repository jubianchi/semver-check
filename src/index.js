import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import ReactGA from 'react-ga';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <StrictMode>
        <Router basename="/semver-check">
            <App />
        </Router>
    </StrictMode>,
    document.getElementById('root'),
);

if (process.env.NODE_ENV !== 'production') {
    ReactGA.initialize('UA-56445984-1', {
        debug: false,
    });
    ReactGA.ga('send', 'pageview');
}

registerServiceWorker();
