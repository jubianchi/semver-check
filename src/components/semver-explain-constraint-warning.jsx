var React = require('react'),
    SemverConstraint = require('../libs/semver-constraint.js'),
    If = require('./semver-if.jsx'),
    SemverRange = require('./semver-range.jsx');

var SemverExplainConstraintWarning = React.createClass({
        render: function() {
            if (!this.props.constraint) {
                return false;
            }

            this.props.constraint = new SemverConstraint(this.props.constraint);

            return (
                <div>
                    <If test={ !this.props.constraint.upper() && ['version', 'range (advanced)'].indexOf(this.props.constraint.type()) === -1 && ['<', '<='].indexOf(this.props.constraint.operator()) === -1 }>
                        <p>This constraint <a href="#why-using-loose-constraint-is-bad">does not provide an upper bound</a> which means you will probably get <strong>unexpected BC break</strong>.</p>
                    </If>

                    <If test={ this.props.constraint.type() == 'version' }>
                        <p>This constraint <a href="#why-using-strict-constraint-is-bad">is too strict</a> which means <strong>you won't even get bug fixes</strong>.</p>
                    </If>

                    <If test={ this.props.constraint.type() != 'version' && this.props.constraint.parts()[0] == '0' }>
                        <p>When locking on <strong>unstable releases</strong> (<code>0.x.y</code>) you should use a <strong>strict constraint</strong>. As said by <a href="http://semver.org">semver</a> (4), these releases may break anything at any time.</p>
                    </If>
                </div>
            );
        }
    });

module.exports = SemverExplainConstraintWarning;
