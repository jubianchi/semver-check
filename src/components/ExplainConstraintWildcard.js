// @flow

import React, { Fragment, type Node } from 'react';
import Alert from './Alert';
import WhatYouGet from './WhatYouGet';

type ExplainConstraintWildcardProps = {
    constraint: Object,
};

const ExplainConstraintWildcard = (props: ExplainConstraintWildcardProps): Node => (
    <Fragment>
        <p className="card-text">
            <code>{props.constraint.constraint}</code> is a <strong>x-range</strong> constraint. It means that it will
            match <strong>several versions</strong>.
        </p>

        <WhatYouGet
            major={props.constraint.semver.major === '*'}
            minor={props.constraint.semver.major === '*' || props.constraint.semver.minor === '*'}
            patch
        />

        {props.constraint.semver.major === '*' && (
            <Alert error>
                This constraint is <strong>too loose</strong> which means{' '}
                <strong>you will probably get unexpected breaking changes</strong>.
            </Alert>
        )}
    </Fragment>
);

export default ExplainConstraintWildcard;
