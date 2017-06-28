var React = require('react'),
    SemverConstraint = require('../libs/semver-constraint.js');

var SemverExplainConstraintBundler = React.createClass({
        render: function() {
            if (!this.props.constraint) {
                return false;
            }

            this.props.constraint = new SemverConstraint(this.props.constraint);

            if (this.props.constraint.type() !== 'range (pessimistic)') {
                return false;
            }

            return (
                <p>
                    This <a href="http://guides.rubygems.org/patterns/#pessimistic-version-constraint">pessimistic version constraint</a> is an operator provided by Bundler and RubyGems.
                </p>
            );
        }
    });

module.exports = SemverExplainConstraintBundler;
