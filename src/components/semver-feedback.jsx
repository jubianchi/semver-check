var React = require('react');

var SemverFeedback = React.createClass({
        render: function() {
            if (true === this.props.satisfies) {
                return (
                    <div className="well success">
                        <code>{ this.props.version }</code> satisfies constraint <code>{ this.props.constraint }</code>
                    </div>
                );
            }

            if (false === this.props.satisfies) {
                return (
                    <div className="well error">
                        <code>{ this.props.version }</code> does not satisfy constraint <code>{ this.props.constraint }</code>
                    </div>
                );
            }

            return (
                <div className="well">
                    <span>Enter a constraint and a version to check if they match</span>
                </div>
            );
        }
    });

module.exports = SemverFeedback;
