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
            constraint: null,
            explain: null
        };
    },

    handleSemverCheck: function(version, constraint) {
        this.setState({
            satisfies: !!semver.satisfies(version, constraint),
            version: version,
            constraint: constraint,
            explain: {
                constraint: {
                    cleaned: semver.clean(constraint)
                },
                version: {
                    next: {
                        major: semver.inc(version, 'major'),
                        minor: semver.inc(version, 'minor'),
                        patch: semver.inc(version, 'patch')
                    }
                }
            }
        });
    },

    handleSemverValidate: function(version) {
        return semver.valid(version);
    },

    render: function() {
        return (
            <div>
                <SemverCheckerForm onSemverCheck={ this.handleSemverCheck } onSemverValidate={ this.handleSemverValidate } />

                <SemverFeedback satisfies={ this.state.satisfies } version={ this.state.version } constraint={ this.state.constraint } />

                <SemverExplain version={ this.state.version } constraint={ this.state.constraint } explain={ this.state.explain } />
            </div>
        );
    }
});

module.exports = SemverChecker;
