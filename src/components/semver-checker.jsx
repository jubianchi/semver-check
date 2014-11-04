var React = require('react'),
    semver = require('semver'),
    SemverCheckerForm = require('./semver-checker-form.jsx'),
    SemverFeedback = require('./semver-feedback.jsx');

var SemverChecker = React.createClass({
    getInitialState: function() {
        return {
            satisfies: null,
            feedback: 'Enter a constraint and a version number to check if it matches.'
        };
    },

    handleSemverCheck: function(semverData) {
        this.setState({
            satisfies: semver.satisfies(semverData.version, semverData.constraint),
            data: semverData
        });
    },

    handleSemverValidate: function(semverData) {
        return semver.valid(semverData.version);
    },

    render: function() {
        return (
            <div>
                <SemverCheckerForm onSemverCheck={ this.handleSemverCheck } onSemverValidate={ this.handleSemverValidate } />

                <SemverFeedback satisfies={ this.state.satisfies } data={ this.state.data } />
            </div>
        );
    }
});

module.exports = SemverChecker;
