var semver = require('semver'),
    padVersion = function (version, padding) {
        version = version.toString().split('.');

        while (version.length < 3) {
            version.push(padding);
        }

        return version.join('.');
    },
    SemverConstraint = function SemverConstraint(value) {
        if (value) {
            this.constraint = value;
            this.desugared = this.constraint.replace(/(x|X)/, '*');
        }
    };

SemverConstraint.prototype = {
    operator: function() {
        var op = this.desugared[0];

        if (/\d/.test(op)) {
            op = '=';
        } else {
            if (/\d/.test(this.desugared[1]) === false) {
                op += this.desugared[1];
            }
        }

        var operator = op;

        this.operator = function() {
            return operator;
        };

        return operator;
    },

    parts: function() {
        var parts = this.cleaned().split('.');

        this.parts = function() {
            return parts;
        };

        return parts;
    },

    cleaned: function() {
        var cleaned = this.desugared.replace(/^(\^|~|<=?|>=?)\s*/, '').replace(/\.\*/, '');

        this.cleaned = function() {
            return cleaned;
        };

        return cleaned;
    },

    type: function() {
        var type;

        switch (true) {
            case this.desugared.indexOf('||') > -1:
                type = 'range (advanced)';
                break;

            case this.desugared.indexOf(' - ') > -1:
                type = 'range (hyphen)';
                break;

            case this.desugared.indexOf('~') === 0:
                type = 'range (tilde)';
                break;

            case this.desugared.indexOf('^') === 0:
                type = 'range (caret)';
                break;

            case this.desugared.indexOf('>') === 0:
            case this.desugared.indexOf('<') === 0:
                type = 'range';
                break;

            case (/\*$/.test(this.desugared) || this.parts().length < 3):
                type = 'wildcard';
                break;

            default:
                type = 'version';
        }

        this.type = function() {
            return type;
        };

        return type;
    },

    lower: function() {
        var lower;

        switch (this.type()) {
            case 'range (hyphen)':
                var parts = this.desugared.split(' - ');
                lower = padVersion(parts[0], '0');
                break;

            case 'range (tilde)':
                lower = padVersion(this.cleaned(), '0');
                break;

            case 'range (caret)':
                lower = padVersion(this.cleaned(), '0');
                break;

            case 'range':
                if (this.operator() === '>') {
                    lower = padVersion(this.cleaned(), '0');
                }

                if (this.operator() === '<') {
                    lower = '0.0.0';
                }
                break;

            case 'wildcard':
                if (this.parts()[0] === '*') {
                    lower = '0.0.0';
                } else {
                    lower = padVersion(this.desugared, 0);
                }
                break;
        }

        if (lower) {
            lower = new SemverConstraint('>=' + lower.replace('*', '0'));
        }

        this.lower = function() {
            return lower;
        };

        return lower;
    },

    upper: function() {
        var inclusive, upper;

        switch (this.type()) {
            case 'range (hyphen)':
                var parts = this.desugared.split(' - ');

                if (parts[1].split('.').length === 1) {
                    upper = semver.inc(padVersion(parts[1], '0'), 'major');
                }

                if (parts[1].split('.').length === 2) {
                    upper = semver.inc(padVersion(parts[1], '0'), 'minor');
                }

                if (parts[1].split('.').length === 3) {
                    upper = parts[1];
                    inclusive = true;
                }
                break;

            case 'range (tilde)':
                if (this.parts().length === 1) {
                    upper = semver.inc(padVersion(this.cleaned(), '0'), 'major');
                } else {
                    upper = semver.inc(padVersion(this.cleaned(), '0'), 'minor');
                }
                break;

            case 'range (caret)':
                if (this.parts()[0] === '0') {
                    if (this.parts().length > 1) {
                        if (this.parts()[1] !== '0') {
                            upper = semver.inc(padVersion(this.lower().cleaned(), '0'), 'minor');
                        } else {
                            if (this.parts().length === 1) {
                                upper = semver.inc(padVersion(this.lower().cleaned(), '0'), 'major');
                            }

                            if (this.parts().length === 2) {
                                upper = semver.inc(padVersion(this.lower().cleaned(), '0'), 'minor');
                            }

                            if (this.parts().length === 3) {
                                upper = semver.inc(padVersion(this.lower().cleaned(), '0'), 'patch');
                            }
                        }
                    } else {
                        upper = semver.inc(padVersion(this.lower().cleaned(), '0'), 'major');
                    }
                } else {
                    upper = semver.inc(padVersion(this.lower().cleaned(), '0'), 'major');
                }
                break;

            case 'range':
                if (this.operator() === '<') {
                    upper = padVersion(this.cleaned(), '0');
                }
                break;

            case 'wildcard':
                if (this.parts()[0] !== '*') {
                    if (this.parts()[1] === '*') {
                        upper = semver.inc(padVersion(this.lower().cleaned(), '0'), 'major');
                    } else {
                        if (this.parts().length === 1) {
                            upper = semver.inc(padVersion(this.lower().cleaned(), '0'), 'major');
                        } else {
                            upper = semver.inc(padVersion(this.lower().cleaned(), '0'), 'minor');
                        }
                    }
                }
                break;
        }

        if (upper) {
            upper = new SemverConstraint('<' + (inclusive ? '=' : '') + upper);
        }

        this.upper = function() {
            return upper;
        };

        return upper;
    },

    includes: function() {
        var include = {
            major: false,
            minor: false,
            patch: false
        };

        switch (this.type()) {
            case 'range (tilde)':
                if (this.parts().length === 1) {
                    include.minor = true;
                }

                include.patch = true;
                break;

            case 'range (caret)':
                if (this.parts()[0] === '0') {
                    if (this.parts().length > 1) {
                        if (this.parts()[1] === '0') {
                            if (this.parts().length === 1) {
                                include.minor = true;
                            }
                        }
                    } else {
                        include.minor = true;
                    }
                } else {
                    include.minor = true;
                }

                include.patch = true;
                break;

            case 'wildcard':
                if (this.parts()[0] !== '*') {
                    if (this.parts()[1] === '*') {
                        include.minor = true;
                    } else {
                        if (this.parts().length === 1) {
                            include.minor = true;
                        }
                    }
                } else {
                    include.major = true;
                    include.minor = true;
                }

                include.patch = true;
                break;
        }

        this.includes = function() {
            return include;
        };

        return include;
    },

    toString: function() {
        return this.constraint;
    }
};

module.exports = SemverConstraint;
