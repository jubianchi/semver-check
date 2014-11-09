var React = require('react'),
    SemverConstraint = require('../libs/semver-constraint.js'),
    If = require('./semver-if.jsx');

var SemverExplainConstraintWarning = React.createClass({
        render: function() {
            if (!this.props.constraint) {
                return false;
            }

            this.props.constraint = new SemverConstraint(this.props.constraint);

            var lower = (this.props.constraint.lower() ? this.props.constraint.lower().toString() : false),
                upper = (this.props.constraint.upper() ? this.props.constraint.upper().toString() : false);

            return (
                <div>
                    <If test={ this.props.constraint.type() == 'range (caret)' }>
                        <p>
                            If you are using composer, you won't be able to use caret-range constraint. You should
                            use something like<If test={ lower }><code>{ lower }</code></If>{ lower && upper ? ' ' : '' }<If test={ upper }><code>{ upper }</code></If>.
                        </p>
                    </If>

                    <If test={ !this.props.constraint.upper() && ['version', 'range (advanced)'].indexOf(this.props.constraint.type()) === -1 && ['<', '<='].indexOf(this.props.constraint.operator()) === -1 }>
                        <p>This constraint <a href="#why-using-loose-constraint-is-bad">does not provide an upper bound</a> which means you will probably get <strong>unexpected BC break</strong>.</p>
                    </If>

                    <If test={ this.props.constraint.type() == 'version' }>
                        <p>This constraint <a href="#why-using-strict-constraint-is-bad">is too strict</a> which means <strong>you won't even get bug fixes</strong>.</p>
                    </If>
                </div>
            );
        }
    });

module.exports = SemverExplainConstraintWarning;
