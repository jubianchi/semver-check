var React = require('react'),
    SemverRange = require('./semver-range.jsx'),
    SemverComposerConstraint = require('../libs/semver-composer-constraint.js');

var SemverExplainConstraintComposer = React.createClass({
        render: function() {
            if (!this.props.constraint) {
                return false;
            }

            this.props.constraint = new SemverComposerConstraint(this.props.constraint);

            if (this.props.constraint.type() !== 'range (tilde)' || this.props.constraint.parts().length !== 2) {
                return false;
            }

            return (
                <p>
                    Composer handles tilde-range differently. Your constraint will translate to <SemverRange lower={ this.props.constraint.lower() } upper={ this.props.constraint.upper() } />.
                </p>
            );
        }
    });

module.exports = SemverExplainConstraintComposer;
