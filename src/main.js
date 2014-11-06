var React = require('react'),
    semver = require('semver'),
    SemverConstraint = require('./libs/semver-constraint.js');

var SemverChecker = require('./components/semver-checker.jsx');

React.render(
    <SemverChecker />,
    document.getElementById('content')
);
