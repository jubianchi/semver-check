var React = require('react'),
    semver = require('semver');

var SemverChecker = require('./components/semver-checker.jsx');

React.renderComponent(
    <SemverChecker />,
    document.getElementById('content')
);
