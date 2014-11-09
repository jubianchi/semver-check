var semver = require('semver'),
    SemverConstraint = require('./semver-constraint.js'),
    padVersion = function (version, padding) {
        version = version.toString().split('.');

        while (version.length < 3) {
            version.push(padding);
        }

        return version.join('.');
    },
    SemverComposerConstraint = function SemverComposerConstraint(value) {
        SemverConstraint.call(this, value);
    };

SemverComposerConstraint.prototype = new SemverConstraint();
SemverComposerConstraint.prototype.upper = function() {
    var upper;

    switch (this.type()) {
        case 'range (tilde)':
            if (this.parts().length === 2) {
                upper = semver.inc(padVersion(this.cleaned(), '0'), 'major');


                if (upper) {
                    upper = new SemverConstraint('<' + upper);
                }

                this.upper = function() {
                    return upper;
                };

                return upper;
            }

        default:
            return SemverConstraint.prototype.upper.call(this);
    }
};

module.exports = SemverComposerConstraint;
