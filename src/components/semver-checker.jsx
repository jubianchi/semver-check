var React = require('react'),
    semver = require('semver'),
    SemverCheckerForm = require('./semver-checker-form.jsx');

var SemverChecker = React.createClass({
    handleSemverCheck: function(semverData) {

        if (semver.satisfies(semverData.version, semverData.constraint)) {
            alert(semverData.version + " version satisfies " + semverData.constraint);
        } else {
            alert(semverData.version + " version doesn't satisfie " + semverData.constraint);
        }
    },
    handleSemverValidate: function(semverData) {
        return semver.valid(semverData.version);
    },
    render: function() {
        return (
            <SemverCheckerForm onSemverCheck={this.handleSemverCheck} onSemverValidate={this.handleSemverValidate} />
        );
    }
});


module.exports = SemverChecker;
