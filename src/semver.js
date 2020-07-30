import semver from 'semver';

const NR = '(?:0|[1-9])[0-9]*';
const BUILD = NR;
const PRE = `[0-9a-zA-Z\\-]+(?:\\.${NR})?`;
const QUALIFIER = `-(?:${PRE})?(?:\\+${BUILD})?`;
const XR = `(?:[xX\\*]|${NR})`;
const PARTIAL = `${XR}(?:\\.${XR}(?:\\.${XR}(?:${QUALIFIER})?)?)?`;
const CARET = `\\^\\s*${PARTIAL}`;
const TILDE = `~\\s*${PARTIAL}`;
const PRIMITIVE = `(?:<|>|<=|>=)\\s*${PARTIAL}`;
const SIMPLE = `(?:${PRIMITIVE}|${PARTIAL}|${TILDE}|${CARET})`;
const HYPHEN = `${PARTIAL}\\s-\\s${PARTIAL}`;
const RANGE = `(?:${HYPHEN}|${SIMPLE}(?:\\s+${SIMPLE})*)`;
const LOGICAL_OR = `\\s*\\|\\|\\s*`;
const RANGE_SET = `${RANGE}(?:${LOGICAL_OR}${RANGE})+`;
const STRICT = `(?:=\\s*)?${NR}\\.${NR}\\.${NR}(?:${QUALIFIER})?`;
const WILDCARD = `(?:[xX\\*]|${NR}\\.[xX\\*]|${NR}\\.${NR}\\.[xX\\*])`;
const PESSIMISTIC = `~>\\s*${PARTIAL}`;

const explode = range => {
    const exploded = {
        major: null,
        minor: null,
        patch: null,
        prerelease: null,
    };

    const [major, minor, patchAndPrerelease, ...rest] = range.split('.');

    exploded.major = major;
    exploded.minor = minor || null;

    if (typeof patchAndPrerelease !== 'undefined') {
        const [patch, prerelease] = `${patchAndPrerelease}${rest.length ? `.${rest.join('.')}` : ''}`.split('-');

        exploded.patch = patch;
        exploded.prerelease = prerelease;
    }

    return exploded;
};

export default {
    ...semver,
    satisfies: (version, constraint, options = {}) => {
        return semver.satisfies(version.raw, constraint.raw, { ...options, includePrerelease: true });
    },
    cleanRange: range =>
        range
            .trim()
            .replace(/v(\d+\.)/gi, '$1')
            .replace(/(^|\s+|\|\|)([^><]?)=(\d+\.)/g, '$1$2$3'),
    coerceRange: range => {
        if (!range && range !== 0) {
            return null;
        }

        const raw = semver.validRange(range.toString());

        if (raw === null || raw === '') {
            return null;
        }

        const coerced = {
            raw,
            caret: false,
            tilde: false,
            strict: false,
            hyphen: false,
            wildcard: false,
            range: false,
            rangeSet: false,
            pessimistic: false,
            major: null,
            minor: null,
            patch: null,
            prerelease: null,
            operator: null,
        };

        if (new RegExp(`^${CARET}$`).exec(range)) {
            coerced.caret = true;
            coerced.operator = '^';

            Object.assign(coerced, explode(range.replace(/^\^/, '')));
        }

        if (new RegExp(`^${TILDE}$`).exec(range)) {
            coerced.tilde = true;
            coerced.operator = '~';

            Object.assign(coerced, explode(range.replace(/^~/, '')));
        }

        if (new RegExp(`^${PESSIMISTIC}$`).exec(range)) {
            coerced.pessimistic = true;
            coerced.operator = '~>';

            Object.assign(coerced, explode(range.replace(/^~>/, '')));

            if (coerced.major !== null && coerced.minor !== null && coerced.patch !== null) {
                coerced.raw = `>=${coerced.major}.${coerced.minor || 0}.${coerced.patch || 0} <${coerced.major}.${
                    parseInt(coerced.minor, 10) + 1
                }.0`;
            } else {
                coerced.raw = `>=${coerced.major}.${coerced.minor || 0}.${coerced.patch || 0} <${
                    parseInt(coerced.major, 10) + 1
                }.0.0`;
            }
        }

        if (new RegExp(`^${HYPHEN}$`).exec(range)) {
            coerced.hyphen = true;
        }

        if (new RegExp(`^${STRICT}$`).exec(range.toString())) {
            coerced.strict = true;
            coerced.operator = '=';

            Object.assign(coerced, explode(range));
        } else if (new RegExp(`^${WILDCARD}$`).exec(range)) {
            coerced.wildcard = true;

            Object.assign(coerced, explode(range.replace(/[xX]/, '*')));
        } else if (new RegExp(`^${RANGE}$`).exec(range.toString())) {
            coerced.range = true;

            const matches = new RegExp('^(<=|<|>=|>|=)').exec(range);

            if (matches !== null) {
                coerced.operator = matches[1] || null;
            }
        } else if (new RegExp(`^${RANGE_SET}$`).exec(range)) {
            coerced.rangeSet = true;
        }

        return coerced;
    },
};
