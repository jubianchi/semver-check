var React = require('react');

var SemverCheckerForm = React.createClass({
    handleChange: function() {
        var constraint = this.refs.constraint.getDOMNode().value.trim(),
            version = this.refs.version.getDOMNode().value.trim(),
            valid = true;

        if (!constraint && !version) {
            this.props.resetState();
            return;
        }

        if (this.props.onSemverValidate(version)) {
            this.refs.version.getDOMNode().classList.remove('error');
        } else {
            this.refs.version.getDOMNode().classList.add('error');
            valid = false;
        }

        if (this.props.onConstraintValidate(constraint)) {
            this.refs.constraint.getDOMNode().classList.remove('error');
        } else {
            this.refs.constraint.getDOMNode().classList.add('error');
            valid = false;
        }

        if (!valid) {
            this.props.resetState();
            return;
        }

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
