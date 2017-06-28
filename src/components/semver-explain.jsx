var React = require('react'),
    semver = require('semver'),
    SemverExplainVersion = require('./semver-explain-version.jsx'),
    SemverExplainConstraint = require('./semver-explain-constraint.jsx'),
    SemverExplainConstraintRange = require('./semver-explain-constraint-range.jsx'),
    SemverExplainConstraintComposer = require('./semver-explain-constraint-composer.jsx'),
    SemverExplainConstraintBundler = require('./semver-explain-constraint-bundler.jsx'),
    SemverExplainConstraintWarning = require('./semver-explain-constraint-warning.jsx'),
    SemverExplainConstraintIncludes = require('./semver-explain-constraint-includes.jsx');

var SemverExplain = React.createClass({
    padVersion: function(version, padding) {
        version = version.toString().split('.');

        while (version.length < 3) {
            version.push(padding);
        }

        return version.join('.');
    },
    render: function() {
        if (!this.props.version && !this.props.constraint) {
            return false;
        }

        return (
            <div className="well">
                <SemverExplainConstraint constraint={ this.props.constraint } />

                <SemverExplainConstraintRange constraint={ this.props.constraint } />

                <SemverExplainConstraintComposer constraint={ this.props.constraint } />

                <SemverExplainConstraintBundler constraint={ this.props.constraint } />

                <SemverExplainConstraintWarning constraint={ this.props.constraint } />

                <SemverExplainConstraintIncludes constraint={ this.props.constraint } />

                <SemverExplainVersion version={ this.props.version } />
            </div>
        );
    }
});

module.exports = SemverExplain;
