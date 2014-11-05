var React = require('react'),
    semver = require('semver');

var SemverChecker = require('./components/semver-checker.jsx');

React.render(
    <SemverChecker />,
    document.getElementById('content')
);
