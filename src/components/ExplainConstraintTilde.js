import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import WhatYouGet from './WhatYouGet';
import Alert from './Alert';

const ExplainConstraintTilde = props => (
    <Fragment>
        <p className="card-text">
            <code>{props.constraint.constraint}</code> is a <strong>tilde</strong> constraint. It means that it will
            match <strong>several versions</strong>.
        </p>

        <WhatYouGet minor={props.constraint.semver.minor === null} patch />

        {props.constraint.semver.major && props.constraint.semver.minor && !props.constraint.semver.patch && (
            <Alert warning>
                <p>
                    <strong>Composer</strong> handles tilde constraint differently. Your constraint will translate to{' '}
                    <code>
                        &gt;=
                        {props.constraint.semver.major}.{props.constraint.semver.minor}
                        .0 &lt;
                        {parseInt(props.constraint.semver.major, 10) + 1}
                        .0.0
                    </code>
                    .
                </p>

                <WhatYouGet minor patch />
            </Alert>
        )}
    </Fragment>
);

ExplainConstraintTilde.propTypes = {
    className: PropTypes.string,
    constraint: PropTypes.object.isRequired,
};

export default ExplainConstraintTilde;
