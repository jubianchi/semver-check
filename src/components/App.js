import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Form from './Form';
import Explain from './Explain';
import Why from './Why';
import Implementations from './Implementations';
import WhyStrict from './WhyStrict';
import WhyLoose from './WhyLoose';
import Footer from './Footer';

const Presenter = () => (
    <Fragment>
        <Form className="mb-3" />

        <Explain className="mb-3" />

        <Why className="mb-3" />

        <Implementations className="mb-3" />

        <WhyStrict className="mb-3" />

        <WhyLoose className="mb-3" />
    </Fragment>
);

class App extends Component {
    render() {
        return (
            <div className="container">
                <Header className="mb-3" />

                <Switch>
                    <Route exact path="/" component={Presenter} />
                    <Route exact path="/constraint/:constraint" component={Presenter} />
                    <Route exact path="/version/:version" component={Presenter} />
                    <Route exact path="/:constraint/:version" component={Presenter} />
                </Switch>

                <Footer />
            </div>
        );
    }
}

export default App;
