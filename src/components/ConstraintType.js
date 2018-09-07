import PropTypes from 'prop-types';

const type = semver => {
    if (semver.caret) {
        return 'Caret';
    }

    if (semver.tilde) {
        return 'Tilde';
    }

    if (semver.strict) {
        return 'Strict';
    }

    if (semver.hyphen) {
        return 'Hyphen';
    }

    if (semver.wildcard) {
        return 'X-Range';
    }

    if (semver.pessimistic) {
        return 'Pessimistic';
    }

    if (semver.rangeSet) {
        return 'Range-set';
    }

    if (semver.range) {
        return 'Range';
    }

    return 'Weird';
};

const ConstraintType = props => type(props.constraint.semver);

ConstraintType.propTypes = {
    className: PropTypes.string,
    constraint: PropTypes.object.isRequired,
};

export default ConstraintType;
