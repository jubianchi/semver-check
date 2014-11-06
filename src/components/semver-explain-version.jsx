var React = require('react'),
    semver = require('semver');

var SemverExplainVersion = React.createClass({
        render: function() {
            if (!this.props.version) {
                return false;
            }

            var next = {
                major: semver.inc(this.props.version, 'major'),
                minor: semver.inc(this.props.version, 'minor'),
                patch: semver.inc(this.props.version, 'patch')
            };

            return (
                <div>
                    <p>Given the version you entered:</p>
                    <ul>
                        <li>The next <strong>major</strong> release will be <code>{ next.major }</code></li>
                        <li>The next <strong>minor</strong> release will be <code>{ next.minor }</code></li>
                        <li>The next <strong>patch</strong> release will be <code>{ next.patch }</code></li>
                    </ul>
                </div>
            );
        }
    });

module.exports = SemverExplainVersion;
