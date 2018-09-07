import React from 'react';
import PropTypes from 'prop-types';

const ExplainConstraintHyphen = props => (
    <p className="card-text">
        <code>{props.constraint.constraint}</code> is a <strong>hyphen</strong> constraint. It means that it will match{' '}
        <strong>several versions</strong>.
    </p>
);

ExplainConstraintHyphen.propTypes = {
    className: PropTypes.string,
    constraint: PropTypes.object.isRequired,
};

export default ExplainConstraintHyphen;
