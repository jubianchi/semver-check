import React from 'react';
import PropTypes from 'prop-types';
import semver from '../semver';
import Card from './Card';

const ExplainVersion = props => {
    let satisfies = null;

    if (props.constraint && props.constraint.semver) {
        satisfies = semver.satisfies(props.version.semver, props.constraint.semver);
    }

    return (
        <Card className={`card ${satisfies === true && 'border-success'} ${satisfies === false && 'border-danger'}`}>
            <h5 className="card-title">{props.version.version}</h5>
            {satisfies === true && (
                <h6 className="card-subtitle mb-3 text-success">
                    <code>{props.version.version}</code> satisfies constraint <code>{props.constraint.constraint}</code>
                </h6>
            )}

            {satisfies === false && (
                <h6 className="card-subtitle mb-3 text-danger">
                    <code>{props.version.version}</code> does not satisfy constraint{' '}
                    <code>{props.constraint.constraint}</code>
                </h6>
            )}

            <p className="card-text mb-1">Given the version you entered:</p>

            <ul>
                {['major', 'premajor', 'minor', 'preminor', 'patch', 'prepatch', 'prerelease'].map(type => (
                    <li key={type}>
                        The next <strong>{type}</strong> release will be{' '}
                        <code>{semver.inc(props.version.version, type)}</code>
                    </li>
                ))}
            </ul>
        </Card>
    );
};

ExplainVersion.propTypes = {
    version: PropTypes.object.isRequired,
    constraint: PropTypes.object,
};

ExplainVersion.defaultProps = {
    constraint: null,
};

export default ExplainVersion;
