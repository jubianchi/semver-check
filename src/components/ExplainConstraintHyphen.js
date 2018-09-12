// @flow

import React, { type Node } from 'react';

type ExplainConstraintHyphenProps = {
    constraint: Object,
};

const ExplainConstraintHyphen = (props: ExplainConstraintHyphenProps): Node => (
    <p className="card-text">
        <code>{props.constraint}</code> is a <strong>hyphen</strong> constraint. It means that it will match{' '}
        <strong>several versions</strong>.
    </p>
);

export default ExplainConstraintHyphen;
