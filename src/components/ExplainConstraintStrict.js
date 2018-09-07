import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Alert from './Alert';

const ExplainConstraintStrict = props => (
    <Fragment>
        <p className="card-text">
            <code>{props.constraint.constraint}</code> is a <strong>strict</strong> constraint. It means that it will
            match <strong>a single version</strong>.
        </p>

        <Alert error>
            This constraint is <strong>too strict</strong> which means <strong>you won't even get bug fixes</strong>.
        </Alert>
    </Fragment>
);

ExplainConstraintStrict.propTypes = {
    className: PropTypes.string,
    constraint: PropTypes.object.isRequired,
};

export default ExplainConstraintStrict;
