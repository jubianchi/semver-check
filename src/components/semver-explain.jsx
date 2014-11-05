var React = require('react'),
    semver = require('semver');

var If = React.createClass({
        render: function() {
            if (this.props.test) {
                return this.props.children;
            }

            return false;
        }
    }),
    SemverExplain = React.createClass({
        padVersion: function(version, padding) {
            version = version.toString().split('.');

            while (version.length < 3) {
                version.push(padding);
            }

            return version.join('.');
        },
        render: function() {
            if (!this.props.version || !this.props.constraint) {
                return false;
            }

            var cleaned = this.props.constraint.replace(/^(\^|~|<|>)/, ''),
                padded = this.padVersion(cleaned, '0'),
                explain = {
                    constraint: {
                        type: 'version',
                        translated: null,
                        warning: false,
                        value: this.props.constraint,
                        parts: cleaned.split('.'),
                        include: {
                            major: false,
                            minor: false,
                            patch: false
                        },
                        next: {
                            major: semver.inc(padded, 'major'),
                            minor: semver.inc(padded, 'minor'),
                            patch: semver.inc(padded, 'patch')
                        }
                    },
                    version: {
                        parts: this.props.version.split('.'),
                        next: {
                            major: semver.inc(this.props.version, 'major'),
                            minor: semver.inc(this.props.version, 'minor'),
                            patch: semver.inc(this.props.version, 'patch')
                        }
                    }
                },
                inclusive = false,
                lower, upper;

            switch (true) {
                case explain.constraint.value.indexOf('||') > -1:
                    explain.constraint.type = 'range (advanced)';
                    break;

                case explain.constraint.value.indexOf(' - ') > -1:
                    explain.constraint.type = 'range (hyphen)';

                    var parts = explain.constraint.value.split(' - ');
                    lower = this.padVersion(parts[0], '0');
                    upper = this.padVersion(parts[1], '0');
                    inclusive = true;
                    break;

                case explain.constraint.value.indexOf('~') === 0:
                    explain.constraint.type = 'range (tilde)';
                    lower = this.padVersion(explain.constraint.value.replace(/^~\s*/, ''), '0');

                    if (explain.constraint.parts.length === 1) {
                        upper = explain.constraint.next.major;
                        explain.constraint.include.minor = true;
                        explain.constraint.include.patch = true;
                    } else {
                        upper = explain.constraint.next.minor;
                        explain.constraint.include.patch = true;
                    }
                    break;

                case explain.constraint.value.indexOf('^') === 0:
                    explain.constraint.type = 'range (caret)';
                    lower = explain.constraint.value.replace(/^\^\s*/, '').replace(/\.(x|X)/, '');
                    explain.constraint.parts = lower.split('.');

                    if (explain.constraint.parts[0] === '0') {
                        if (explain.constraint.parts.length > 1) {
                            if (explain.constraint.parts[1] !== '0') {
                                upper = semver.inc(this.padVersion(lower, '0'), 'minor');
                            } else {
                                if (explain.constraint.parts.length === 1) {
                                    upper = semver.inc(this.padVersion(lower, '0'), 'major');
                                    explain.constraint.include.minor = true;
                                }

                                if (explain.constraint.parts.length === 2) {
                                    upper = semver.inc(this.padVersion(lower, '0'), 'minor');
                                }

                                if (explain.constraint.parts.length === 3) {
                                    upper = explain.constraint.next.patch;
                                }
                            }
                        } else {
                            upper = semver.inc(this.padVersion(lower, '0'), 'major');
                            explain.constraint.include.minor = true;
                        }
                    } else {
                        upper = semver.inc(this.padVersion(lower, '0'), 'major');
                        explain.constraint.include.minor = true;
                    }

                    explain.constraint.include.patch = true;
                    lower = this.padVersion(lower, '0');
                    break;

                case explain.constraint.value.indexOf('>') === 0:
                    explain.constraint.type = 'range';
                    lower = this.padVersion(explain.constraint.value.replace(/^>\s*/, ''), '0');

                    if (explain.constraint.parts.length < 2) {
                        lower = explain.constraint.next.major;
                    } else {
                        if (explain.constraint.parts.length < 3) {
                            lower = explain.constraint.next.minor;
                        } else {
                            lower = explain.constraint.next.patch;
                        }
                    }
                    break;

                case explain.constraint.value.indexOf('<') === 0:
                    explain.constraint.type = 'range';
                    upper = this.padVersion(explain.constraint.value.replace(/^<\s*/, ''), '0');
                    lower = '0.0.0';
                    break;

                case (!!explain.constraint.value.match(/(\*|x|X)$/) || explain.constraint.parts.length < 3):
                    explain.constraint.type = 'wildcard';
                    explain.constraint.parts = explain.constraint.parts.map(function(part) {
                        return part.replace(/(x|X)$/, '*');
                    });

                    if (explain.constraint.parts[0] === '*') {
                        explain.constraint.translated = '>=0.0.0';
                        explain.constraint.warning = true;
                        explain.constraint.include.major = true;
                        explain.constraint.include.minor = true;
                    } else {
                        if (explain.constraint.parts[1] === '*') {
                            upper = explain.version.next.major;
                            explain.constraint.include.minor = true;
                        } else {
                            upper = explain.version.next.minor;
                        }

                        lower = this.padVersion(explain.constraint.parts.join('.').replace('*', '0'), 0);
                    }

                    explain.constraint.include.patch = true;
                    break;
            }

            if (explain.constraint.type !== 'version') {
                if (lower) {
                    explain.constraint.translated = '>=' + lower;
                }

                if (!upper) {
                    explain.constraint.warning = true;
                } else {
                    explain.constraint.translated += (explain.constraint.translated ? ' ' : '') + (inclusive ? '<=' : '<') + upper;
                }
            }

            return (
                <div className="well">
                    <p>
                        <code>{ this.props.constraint }</code> is a <strong>{ explain.constraint.type }</strong> constraint.
                        It means that it will match <strong>{ explain.constraint.type !== 'version' ? 'several versions' : 'a single version' }</strong>.
                    </p>
                    <If test={ explain.constraint.translated }>
                        <p>In fact, the current constraint will be satisfied by any version matching <code>{ explain.constraint.translated }</code></p>
                    </If>
                    <If test={ explain.constraint.warning }>
                        <p>This range <strong>does not provide an upper bound</strong> which means you will probably get <strong>unexpected BC break</strong>.</p>
                    </If>

                    <If test={ explain.constraint.include.major || explain.constraint.include.minor || explain.constraint.include.patch }>
                        <div>
                            <p>Given the constraint you entered, you will get:</p>
                            <ul>
                                <If test={ explain.constraint.include.major }>
                                    <li>The next <strong>major</strong> releases which will probably <strong>break stuff</strong></li>
                                </If>
                                <If test={ explain.constraint.include.minor }>
                                    <li>The next <strong>minor</strong> releases which will provide <strong>new features</strong></li>
                                </If>
                                <If test={ explain.constraint.include.patch }>
                                    <li>The next <strong>patch</strong> releases which will <strong>fix bugs</strong></li>
                                </If>
                            </ul>
                        </div>
                    </If>

                    <p>Given the version you entered:</p>
                    <ul>
                        <li>The next <strong>major</strong> release will be <code>{ explain.version.next.major }</code></li>
                        <li>The next <strong>minor</strong> release will be <code>{ explain.version.next.minor }</code></li>
                        <li>The next <strong>patch</strong> release will be <code>{ explain.version.next.patch }</code></li>
                    </ul>
                </div>
            );
        }
    });

module.exports = SemverExplain;
