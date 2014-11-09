var React = require('react'),
    semver = require('semver'),
    SemverCheckerForm = require('./semver-checker-form.jsx'),
    SemverFeedback = require('./semver-feedback.jsx'),
    SemverExplain = require('./semver-explain.jsx');

var SemverChecker = React.createClass({
    getInitialState: function() {
        return {
            satisfies: null,
            version: null,
            constraint: null
        };
    },
    resetState: function() {
        this.setState(this.getInitialState());
    },

    handleSemverCheck: function(version, constraint) {
        this.setState({
            satisfies: !!semver.satisfies(version, constraint),
            version: version,
            constraint: constraint
        });
    },

    handleSemverValidate: function(version) {
        return semver.valid(version);
    },

    handleConstraintValidate: function(constraint) {
        return semver.validRange(constraint);
    },

    render: function() {
        return (
            <div>
                <SemverCheckerForm resetState={ this.resetState } onSemverCheck={ this.handleSemverCheck } 
                    onSemverValidate={ this.handleSemverValidate } onConstraintValidate={ this.handleConstraintValidate } />

                <SemverFeedback satisfies={ this.state.satisfies } version={ this.state.version } constraint={ this.state.constraint } />

                <SemverExplain version={ this.state.version } constraint={ this.state.constraint } />
            </div>
        );
    }
});

module.exports = SemverChecker;
