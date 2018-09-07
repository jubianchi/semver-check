import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Alert from './Alert';
import WhatYouGet from './WhatYouGet';

const ExplainConstraintWildcard = props => (
    <Fragment>
        <p className="card-text">
            <code>{props.constraint.constraint}</code> is a <strong>x-range</strong> constraint. It means that it will
            match <strong>several versions</strong>.
        </p>

        <WhatYouGet
            major={props.constraint.semver.major === '*'}
            minor={props.constraint.semver.major === '*' || props.constraint.semver.minor === '*'}
            patch={
                props.constraint.semver.major === '*' ||
                props.constraint.semver.minor === '*' ||
                props.constraint.semver.patch === '*'
            }
        />

        {props.constraint.semver.major === '*' && (
            <Alert error>
                This constraint is <strong>too loose</strong> which means{' '}
                <strong>you will probably get unexpected breaking changes</strong>.
            </Alert>
        )}
    </Fragment>
);

ExplainConstraintWildcard.propTypes = {
    className: PropTypes.string,
    constraint: PropTypes.object.isRequired,
};

export default ExplainConstraintWildcard;
