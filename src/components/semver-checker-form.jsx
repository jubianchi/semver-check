var React = require('react');

var SemverCheckerForm = React.createClass({
    handleChange: function() {
        var constraint = this.refs.constraint.getDOMNode().value.trim(),
            version = this.refs.version.getDOMNode().value.trim();

        if (!constraint || !version) {
            return;
        }

        if (!this.props.onSemverValidate(version )) {
            this.refs.version.getDOMNode().classList.add('error');

            return;
        }

        this.refs.version.getDOMNode().classList.remove('error');

        this.props.onSemverCheck(version, constraint);
    },

    render: function() {
        return (
            <form className="semverCheckerForm">
                <input type="text" placeholder="Constraint" ref="constraint" onChange={this.handleChange} />
                <input type="text" placeholder="Version" ref="version" onChange={this.handleChange} />
            </form>
        );
    }
});

module.exports = SemverCheckerForm;
