var React = require('react'),
    SemverConstraint = require('../libs/semver-constraint.js');

var SemverExplainConstraint = React.createClass({
        render: function() {
            if (!this.props.constraint) {
                return false;
            }

            this.props.constraint = new SemverConstraint(this.props.constraint);

            return (
                <p>
                    <code>{ this.props.constraint.toString() }</code> is a <strong>{ this.props.constraint.type() }</strong> constraint.
                    It means that it will match <strong>{ this.props.constraint.type() !== 'version' ? 'several versions' : 'a single version' }</strong>.
                </p>
            );
        }
    });

module.exports = SemverExplainConstraint;
