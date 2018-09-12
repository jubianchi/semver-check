import React, { Fragment, type Node } from 'react';
import Alert from './Alert';

type ExplainConstraintPessimisticProps = {
    constraint: Object,
};

const ExplainConstraintPessimistic = (props: ExplainConstraintPessimisticProps): Node => (
    <Fragment>
        <p className="card-text">
            <code>{props.constraint}</code> is a <strong>pessimistic</strong> constraint. It means that it will match{' '}
            <strong>several versions</strong>.
        </p>

        <Alert warning>
            This is a special notation only supported by <strong>Bundler</strong>.
        </Alert>
    </Fragment>
);

export default ExplainConstraintPessimistic;
