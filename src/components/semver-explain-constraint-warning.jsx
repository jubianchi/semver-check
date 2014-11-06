var React = require('react'),
    SemverConstraint = require('../libs/semver-constraint.js'),
    If = require('./semver-if.jsx');

var SemverExplainConstraintWarning = React.createClass({
        render: function() {
            if (!this.props.constraint) {
                return false;
            }

            this.props.constraint = new SemverConstraint(this.props.constraint);

            return (
                <div>
                    <If test={ !this.props.constraint.upper() }>
                        <p>This constraint <strong>does not provide an upper bound</strong> which means you will probably get <strong>unexpected BC break</strong>.</p>
                    </If>

                    <If test={ this.props.constraint.type() == 'version' }>
                        <p>This constraint <strong>is too strict</strong> which means <strong>you won't even get bug fixes</strong>.</p>
                    </If>
                </div>
            );
        }
    });

module.exports = SemverExplainConstraintWarning;
