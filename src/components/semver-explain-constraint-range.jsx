var React = require('react'),
    SemverRange = require('./semver-range.jsx'),
    SemverConstraint = require('../libs/semver-constraint.js');

var SemverExplainConstraintRange = React.createClass({
        render: function() {
            if (!this.props.constraint) {
                return false;
            }

            this.props.constraint = new SemverConstraint(this.props.constraint);

            if (['version', 'range (advanced)'].indexOf(this.props.constraint.type()) === -1 && ['<', '<=', '>', '>='].indexOf(this.props.constraint.operator()) === -1) {
                return (
                    <p>
                        In fact, the current constraint will be satisfied by any version matching <SemverRange lower={ this.props.constraint.lower() } upper={ this.props.constraint.upper() } />.
                    </p>
                );
            }

            return false;
        }
    });

module.exports = SemverExplainConstraintRange;
