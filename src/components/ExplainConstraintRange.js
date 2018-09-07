import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Alert from './Alert';

const ExplainConstraintRange = props => {
    const bound = props.constraint.semver.raw.split(' ').length > 1;

    return (
        <Fragment>
            <p className="card-text">
                <code>{props.constraint.constraint}</code> is a <strong>range</strong> constraint. It means that it will
                match <strong>several versions</strong>.
            </p>

            {bound === false &&
                (['>', '>='].indexOf(props.constraint.semver.operator) > -1 ? (
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

ExplainConstraintRange.propTypes = {
    className: PropTypes.string,
    constraint: PropTypes.object.isRequired,
};

export default ExplainConstraintRange;
