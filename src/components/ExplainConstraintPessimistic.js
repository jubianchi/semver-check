import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Alert from './Alert';

const ExplainConstraintPessimistic = props => (
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

ExplainConstraintPessimistic.propTypes = {
    constraint: PropTypes.string.isRequired,
};

export default ExplainConstraintPessimistic;
