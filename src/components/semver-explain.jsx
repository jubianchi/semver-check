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
            if (!this.props.explain) {
                return false;
            }

            var explain = {
                    constraint: {
                        type: 'version',
                        translated: null,
                        warning: false,
                        value: this.props.constraint
                    }
                },
                matches = explain.constraint.value.match(/(\d+)(\.(\d+))?(\.(\d+))?/),
                major = false,
                minor = false,
                patch = false,
                lower, upper;

            switch (true) {
                case explain.constraint.value.indexOf('~') === 0:
                    explain.constraint.type = 'range (tilde)';

                    if (matches[5] === undefined) {
                        if (matches[3] === undefined) {
                            upper = (parseInt(matches[1], 10) + 1) + '.0.0';
                            minor = semver.inc(this.props.version, 'minor');
                            patch = semver.inc(this.props.version, 'patch');
                        } else {
                            upper = matches[1] + '.' + (parseInt(matches[3], 10) + 1) + '.0';
                            patch = semver.inc(this.props.version, 'patch');
                        }
                    } else {
                        upper = matches[1] + '.' + (parseInt(matches[3], 10) + 1) + '.0';
                        patch = semver.inc(this.props.version, 'patch');
                    }

                    explain.constraint.value = '~' + this.padVersion(explain.constraint.value.replace(/^~\s*/, ''), '0');
                    explain.constraint.translated = ' >=' + explain.constraint.value.replace('~', '') + ' <' + upper;
                    break;

                case explain.constraint.value.indexOf('^') === 0:
                    explain.constraint.type = 'range (caret)';
                    explain.constraint.value = '^' + this.padVersion(explain.constraint.value.replace(/^\^\s*/, ''), '0');

                    if (matches[1] === '0') {
                        if (matches[3] === '0') {
                            upper = matches[1] + '.' + matches[3] + '.' + (parseInt(matches[5], 10) + 1);
                        } else {
                            upper = matches[1] + '.' + (parseInt(matches[3], 10) + 1) + '.0';
                        }
                    } else {
                        upper = (parseInt(matches[1], 10) + 1) + '.0.0';
                    }

                    console.log(explain.constraint.value);
                    explain.constraint.translated = ' >=' + explain.constraint.value.replace('^', '') + ' <' + upper;
                    break;

                case explain.constraint.value.indexOf('>') === 0:
                    explain.constraint.type = 'range';

                    if (matches[3] === undefined) {
                        lower = (parseInt(matches[1], 10) + 1) + '.0.0';
                    } else {
                        if (matches[5] === undefined) {
                            lower = matches[3] + '.' + (parseInt(matches[3], 10) + 1);
                        } else {
                            lower = matches[1] + '.' + matches[3] + '.' + (parseInt(matches[5], 10) + 1);
                        }
                    }

                    explain.constraint.value = '>' + this.padVersion(explain.constraint.value.replace(/^>\s*/, ''), '0');
                    explain.constraint.translated = '>=' + lower;

                    if (explain.constraint.value.indexOf('<') === -1) {
                        explain.constraint.warning = true;
                    }
                    break;

                case explain.constraint.value.indexOf('<') === 0:
                    explain.constraint.type = 'range';
                    explain.constraint.value = '<' + this.padVersion(explain.constraint.value.replace(/^<\s*/, ''), '0');
                    explain.constraint.translated = '>=0.0.0 ' + explain.constraint.value;
                    break;

                case (!!explain.constraint.value.match(/(\*|x|X)$/) || explain.constraint.value.split('.').length < 3):
                    explain.constraint.type = 'wildcard';
                    explain.constraint.value = this.padVersion(explain.constraint.value.replace(/(\*|x|X)$/, '*'), '*');

                    if (!matches) {
                        explain.constraint.translated = '>=0.0.0';
                        explain.constraint.warning = true;
                        major = semver.inc(this.props.version, 'major');
                        minor = semver.inc(this.props.version, 'minor');
                        patch = semver.inc(this.props.version, 'patch');
                    } else {
                        if (matches[3] === undefined || matches[3] === '*') {
                            upper = (parseInt(matches[1], 10) + 1) + '.0.0';
                            minor = semver.inc(this.props.version, 'minor');
                            patch = semver.inc(this.props.version, 'patch');
                        } else {
                            upper = matches[1] + '.' + (parseInt(matches[3], 10) + 1) + '.0';
                            patch = semver.inc(this.props.version, 'patch');
                        }

                        lower = this.padVersion(this.props.constraint.replace('*', '0'), 0);

                        explain.constraint.translated = '>=' + lower + ' <' + upper;
                    }
                    break;
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

                    <If test={ major || minor || patch }>
                        <div>
                            <p>Given the constraint you entered, you will get:</p>
                            <ul>
                                <If test={ major }>
                                    <li>The next <strong>major</strong> release which will probably <strong>break stuff</strong></li>
                                </If>
                                <If test={ minor }>
                                    <li>The next <strong>minor</strong> release which will provide <strong>new features</strong></li>
                                </If>
                                <If test={ patch }>
                                    <li>The next <strong>patch</strong> release which will <strong>fix bugs</strong></li>
                                </If>
                            </ul>

                            <p>Given the version you entered:</p>
                            <ul>
                                <If test={ major }>
                                    <li>The next <strong>major</strong> release will be <code>{ major }</code></li>
                                </If>
                                <If test={ minor }>
                                    <li>The next <strong>minor</strong> release will be <code>{ minor }</code></li>
                                </If>
                                <If test={ patch }>
                                    <li>The next <strong>patch</strong> release will be <code>{ patch }</code></li>
                                </If>
                            </ul>
                        </div>
                    </If>
                </div>
            );
        }
    });

module.exports = SemverExplain;
