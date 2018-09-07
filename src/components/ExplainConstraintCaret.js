import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import WhatYouGet from './WhatYouGet';

const ExplainConstraintCaret = props => (
    <Fragment>
        <p className="card-text">
            <code>{props.constraint.constraint}</code> is a <strong>caret</strong> constraint. It means that it will
            match <strong>several versions</strong>.
        </p>

        <WhatYouGet minor patch />
    </Fragment>
);

ExplainConstraintCaret.propTypes = {
    className: PropTypes.string,
    constraint: PropTypes.object.isRequired,
};

export default ExplainConstraintCaret;
