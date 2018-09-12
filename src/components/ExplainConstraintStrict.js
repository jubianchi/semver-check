// @flow

import React, { Fragment, type Node } from 'react';
import Alert from './Alert';

type ExplainConstraintStrictProps = {
    constraint: string,
};

const ExplainConstraintStrict = (props: ExplainConstraintStrictProps): Node => (
    <Fragment>
        <p className="card-text">
            <code>{props.constraint}</code> is a <strong>strict</strong> constraint. It means that it will match{' '}
            <strong>a single version</strong>.
        </p>

        <Alert error>
            This constraint is <strong>too strict</strong> which means <strong>you won't even get bug fixes</strong>.
        </Alert>
    </Fragment>
);

export default ExplainConstraintStrict;
