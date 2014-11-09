var React = require('react'),
    If = require('./semver-if.jsx');

var SemverRange = React.createClass({
    render: function() {
        if (!this.props.lower && !this.props.upper) {
            return false;
        }

        var lower = (this.props.lower ? this.props.lower.toString() : false),
            upper = (this.props.upper ? this.props.upper.toString() : false);

        return (
            <code>
                <If test={ lower }><span>{ lower }</span></If>{ lower && upper ? ' ' : '' }<If test={ upper }><span>{ upper }</span></If>
            </code>
        )
    }
});

module.exports = SemverRange;
