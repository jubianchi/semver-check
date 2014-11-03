var React = require('react'),
    semver = require('semver');

var SemverCheckerForm = React.createClass({
    handleSubmit: function(event) {
        event.preventDefault();

        var constraint = this.refs.constraint.getDOMNode().value.trim(),
            version = this.refs.version.getDOMNode().value.trim();

        constraint = semver.clean(constraint);
        version = semver.clean(version);

        if (!constraint || !version) {
            return;
        }

        alert(semver.satisfies(version, constraint));

        // Inject current values
        this.refs.constraint.getDOMNode().value = constraint;
        this.refs.version.getDOMNode().value = version;

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

var SemverChecker = React.createClass({
    render: function() {
        return (
            <SemverCheckerForm />
        );
    }
});

React.renderComponent(
    <SemverChecker />,
    document.getElementById('content')
);
