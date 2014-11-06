var React = require('react'),
    If = require('./semver-if.jsx'),
    SemverConstraint = require('../libs/semver-constraint.js');

var SemverExplainConstraintRange = React.createClass({
        render: function() {
            if (!this.props.constraint) {
                return false;
            }

            this.props.constraint = new SemverConstraint(this.props.constraint);

            var lower = (this.props.constraint.lower() ? this.props.constraint.lower().toString() : false),
                upper = (this.props.constraint.upper() ? this.props.constraint.upper().toString() : false);

            if (this.props.constraint.type() !== 'version') {
                return (
                    <p>
                        In fact, the current constraint will be satisfied by any version matching <If test={ lower }><code>{ lower }</code></If>
                        { lower && upper ? ' ' : '' }
                        <If test={ upper }><code>{ upper }</code></If>.
                    </p>
                );
            }

            return false;
        }
    });

module.exports = SemverExplainConstraintRange;
