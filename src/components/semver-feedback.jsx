var React = require('react');

var SemverFeedback = React.createClass({
    render: function() {
        return (
            <div className={ 'well' + (this.props.satisfies === false ? ' error' : '') }>
                { this.props.satisfies === undefined || this.props.satisfies === null
                    ? 'Enter a constraint and a version to check if it matches.'
                    : (
                        this.props.satisfies === false
                            ? this.props.data.version + ' does not satisfy contraint ' + this.props.data.constraint
                            : this.props.data.version + ' satisfies contraint ' + this.props.data.constraint
                    )
                }
            </div>
        );
    }
});

module.exports = SemverFeedback;
