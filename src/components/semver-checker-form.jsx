var React = require('react'),
    SemverConstraint = require('../libs/semver-constraint.js');

var SemverCheckerForm = React.createClass({
    handleChange: function() {
        var constraint = this.refs.constraint.getDOMNode().value.trim(),
            version = this.refs.version.getDOMNode().value.trim(),
            valid = true;

        if (!constraint && !version) {
            this.props.resetState();
            return;
        }

        if (!!version && this.props.onSemverValidate(version)) {
            this.refs.version.getDOMNode().classList.remove('error');
            this.props.setVersion(version);
        } else {
            this.refs.version.getDOMNode().classList.add('error');
            this.props.setVersion(null);
            valid = false;
        }

        if (!!constraint && this.props.onConstraintValidate(constraint)) {
            this.refs.constraint.getDOMNode().classList.remove('error');
            this.props.setConstraint(constraint);
        } else {
            this.refs.constraint.getDOMNode().classList.add('error');
            if (!constraint) {
                this.props.setConstraint(null);
            }
            valid = false;
        }

        if (!valid) {
            this.props.resetSatisfies();
            return;
        }

        this.props.onSemverCheck(version, new SemverConstraint(constraint));
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
