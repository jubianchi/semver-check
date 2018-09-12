// @flow

import React, { Fragment, type Node } from 'react';
import Alert from './Alert';

type ExplainConstraintRangeProps = {
    constraint: Object,
    range: string,
    operator: string,
};

const ExplainConstraintRange = (props: ExplainConstraintRangeProps): Node => {
    const bound = props.range.split(' ').length > 1;

    return (
        <Fragment>
            <p className="card-text">
                <code>{props.constraint}</code> is a <strong>range</strong> constraint. It means that it will match{' '}
                <strong>several versions</strong>.
            </p>

            {bound === false &&
                (['>', '>='].indexOf(props.operator) > -1 ? (
                    <Alert error>
                        This constraint <strong>does not provide an upper bound</strong> which means{' '}
                        <strong>you will probably get unexpected breaking changes</strong>.
                    </Alert>
                ) : (
                    <Alert error>
                        This constraint <strong>does not provide a lower bound</strong> which means{' '}
                        <strong>you will probably get unexpected breaking changes</strong>.
                    </Alert>
                ))}
        </Fragment>
    );
};

ExplainConstraintRange.defaultProps = {
    operator: null,
};

export default ExplainConstraintRange;
