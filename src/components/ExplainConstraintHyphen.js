import React from 'react';
import PropTypes from 'prop-types';

const ExplainConstraintHyphen = props => (
    <p className="card-text">
        <code>{props.constraint}</code> is a <strong>hyphen</strong> constraint. It means that it will match{' '}
        <strong>several versions</strong>.
    </p>
);

ExplainConstraintHyphen.propTypes = {
    constraint: PropTypes.string.isRequired,
};

export default ExplainConstraintHyphen;
