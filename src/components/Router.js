import { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { constraint, version } from '../actions';
import { Route, Switch } from 'react-router-dom';
import React from 'react';

class Router extends Component {
    updateHistory() {
        const { constraint: stateConstraint, version: stateVersion } = this.props.state;
        const { constraint: routerConstraint, version: routerVersion } = this.props.router;

        if (stateConstraint.constraint !== decodeURIComponent(routerConstraint)) {
            this.props.onRouterConstraint(decodeURIComponent(routerConstraint));
        }

        if (stateVersion.version !== decodeURIComponent(routerVersion)) {
            this.props.onRouterVersion(decodeURIComponent(routerVersion));
        }
    }

    shouldComponentUpdate() {
        const { constraint: stateConstraint, version: stateVersion } = this.props.state;
        const { constraint: routerConstraint, version: routerVersion } = this.props.router;

        return stateConstraint.constraint !== routerConstraint || stateVersion.version !== routerVersion;
    }

    componentDidMount() {
        this.updateHistory();
    }

    componentDidUpdate() {
        this.updateHistory();
    }

    render() {
        return null;
    }
}

const ConnectedRouter = connect(
    (state, props) => ({
        state: {
            version: state.version,
            constraint: state.constraint,
        },
        router: {
            version: props.match.params.version || '',
            constraint: props.match.params.constraint || '',
        },
    }),
    dispatch => ({
        onRouterConstraint: value => {
            dispatch(constraint(value));
        },
        onRouterVersion: value => {
            dispatch(version(value));
        },
    }),
)(Router);

export default () => (
    <Switch>
        <Route exact path="/" render={props => <ConnectedRouter {...props} />} />
        <Route exact path="/constraint/:constraint" render={props => <ConnectedRouter {...props} />} />
        <Route exact path="/version/:version" render={props => <ConnectedRouter {...props} />} />
        <Route exact path="/:constraint/:version" render={props => <ConnectedRouter {...props} />} />
    </Switch>
);
