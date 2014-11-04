var React = require('react/addons');

var If = React.createClass({
        render: function() {
            if (this.props.test) {
                return this.props.children;
            }

            return false;
        }
    }),

    SemverFeedback = React.createClass({
        render: function() {
            var cx = React.addons.classSet,
                classes = cx({
                    well: true,
                    error: this.props.satisfies === false,
                    success: this.props.satisfies === true
                  });

            return (
                <div className={ classes }>
                    <If test={ this.props.satisfies === undefined || this.props.satisfies === null }>
                        <span>Enter a constraint and a version to check if it matches.</span>
                    </If>

                    <If test={ this.props.satisfies === false }>
                        <p>
                            <code>{ this.props.version }</code> does not satisfy contraint <code>{ this.props.constraint }</code>
                        </p>
                    </If>

                    <If test={ this.props.satisfies === true }>
                        <div>
                            <p>
                                <code>{ this.props.version }</code> satisfy contraint <code>{ this.props.constraint }</code>
                            </p>
                        </div>
                    </If>
                </div>
            );
        }
    });

module.exports = SemverFeedback;
