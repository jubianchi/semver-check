var React = require('react'),
    If = require('./semver-if.jsx'),
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

            var lower = (this.props.constraint.lower() ? this.props.constraint.lower().toString() : false),
                upper = (this.props.constraint.upper() ? this.props.constraint.upper().toString() : false);

            return (
                <p>
                    Composer handles tilde-range differently. Your constraint will translate to <If test={ lower }><code>{ lower }</code></If>
                    { lower && upper ? ' ' : '' }
                    <If test={ upper }><code>{ upper }</code></If>.
                </p>
            );
        }
    });

module.exports = SemverExplainConstraintComposer;
