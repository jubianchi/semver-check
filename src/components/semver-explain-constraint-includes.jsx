var React = require('react'),
    If = require('./semver-if.jsx'),
    SemverConstraint = require('../libs/semver-constraint.js');

var SemverExplainConstraintIncludes = React.createClass({
        render: function() {
            if (!this.props.constraint) {
                return false;
            }

            this.props.constraint = new SemverConstraint(this.props.constraint);

            var include = this.props.constraint.includes();

            if (this.props.constraint.type() !== 'version') {
                return (
                    <If test={ include.major || include.minor || include.patch }>
                        <div>
                            <p>Given the constraint you entered, you will get:</p>
                            <ul>
                                <If test={ include.major }>
                                    <li>The next <strong>major</strong> releases which will probably <strong>break stuff</strong></li>
                                </If>
                                <If test={ include.minor }>
                                    <li>The next <strong>minor</strong> releases which will provide <strong>new features</strong></li>
                                </If>
                                <If test={ include.patch }>
                                    <li>The next <strong>patch</strong> releases which will <strong>fix bugs</strong></li>
                                </If>
                            </ul>
                        </div>
                    </If>
                );
            }

            return false;
        }
    });

module.exports = SemverExplainConstraintIncludes;
