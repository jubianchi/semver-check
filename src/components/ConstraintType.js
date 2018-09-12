// @flow

import { type Node } from 'react';

const type = (semver: Object): string => {
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

type ConstraintTypeProps = {
    constraint: Object,
};

export default (props: ConstraintTypeProps): Node => type(props.constraint.semver);
