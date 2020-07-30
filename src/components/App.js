import React, { Component } from 'react';
import './App.scss';
import Header from './Header';
import Form from './Form';
import Explain from './Explain';
import Why from './Why';
import Implementations from './Implementations';
import WhyStrict from './WhyStrict';
import WhyLoose from './WhyLoose';
import Footer from './Footer';
import Router from './Router';
import CopyUrl from './CopyUrl';

class App extends Component {
    render() {
        return (
            <div className="container">
                <Header className="mb-3" />

                <Router />

                <Form className="mb-3" />

                <Explain className="mb-3" />

                <CopyUrl className="mb-3" />

                <Why className="mb-3" />

                <Implementations className="mb-3" />

                <WhyStrict className="mb-3" />

                <WhyLoose className="mb-3" />

                <Footer />
            </div>
        );
    }
}

export default App;
