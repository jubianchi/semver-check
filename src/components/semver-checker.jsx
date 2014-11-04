var React = require('react'),
    semver = require('semver'),
    SemverCheckerForm = require('./semver-checker-form.jsx');

var SemverChecker = React.createClass({
    getInitialState: function() {
        return {
            satisfies: null,
            feedback: 'Enter a constraint and a version number to check if it matches.'
        };
    },

    handleSemverCheck: function(semverData) {

        if (semver.satisfies(semverData.version, semverData.constraint)) {
            this.setState({
                satisfies: true,
                feedback: semverData.version + " version satisfies " + semverData.constraint
            });
        } else {
            this.setState({
                satisfies: false,
                feedback: semverData.version + " version doesn't satisfie " + semverData.constraint
            });
        }
    },

    handleSemverValidate: function(semverData) {
        return semver.valid(semverData.version);
    },

    render: function() {
        return (
            <div>
                <SemverCheckerForm onSemverCheck={this.handleSemverCheck} onSemverValidate={this.handleSemverValidate} />

                <div className={ 'well' + (this.state.satisfies === false ? ' error' : '') }>{ this.state.feedback }</div>
            </div>
        );
    }
});


module.exports = SemverChecker;
