// @flow

import React, { Fragment, type Node } from 'react';
import WhatYouGet from './WhatYouGet';

type ExplainConstraintCaretProps = {
    constraint: Object,
};

const ExplainConstraintCaret = (props: ExplainConstraintCaretProps): Node => (
    <Fragment>
        <p className="card-text">
            <code>{props.constraint}</code> is a <strong>caret</strong> constraint. It means that it will match{' '}
            <strong>several versions</strong>.
        </p>

        <WhatYouGet minor patch />
    </Fragment>
);

export default ExplainConstraintCaret;
