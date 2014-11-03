var React = require('react');

var SemverCheckerForm = React.createClass({
    handleSubmit: function(event) {
        event.preventDefault();

        var constraint = this.refs.constraint.getDOMNode().value.trim(),
            version = this.refs.version.getDOMNode().value.trim();

        if (!constraint || !version) {
            return;
        }

        // Re-inject current values
        this.refs.constraint.getDOMNode().value = constraint;
        this.refs.version.getDOMNode().value = version;

        this.props.onSemverCheck({ version: version, constraint: constraint });

        return;
    },

    render: function() {
        return (
            <form className="semverCheckerForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Constraint" ref="constraint" />
                <input type="text" placeholder="Version" ref="version" />

                <input type="submit" value="Post" />
            </form>
        );
    }
});

module.exports = SemverCheckerForm;
