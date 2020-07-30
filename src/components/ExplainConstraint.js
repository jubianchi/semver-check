import React from 'react';
import PropTypes from 'prop-types';
import ExplainConstraintRange from './ExplainConstraintRange';
import ConstraintType from './ConstraintType';
import ExplainConstraintCaret from './ExplainConstraintCaret';
import ExplainConstraintPessimistic from './ExplainConstraintPessimistic';
import ExplainConstraintStrict from './ExplainConstraintStrict';
import ExplainConstraintHyphen from './ExplainConstraintHyphen';
import ExplainConstraintWildcard from './ExplainConstraintWildcard';
import ExplainConstraintTilde from './ExplainConstraintTilde';
import Card from './Card';

const ExplainConstraint = props => {
    return (
        <Card
            className={`card ${props.constraint.semver.strict === true && 'border-danger'} ${
                props.constraint.semver.tilde === true &&
                props.constraint.semver.major &&
                props.constraint.semver.minor &&
                !props.constraint.semver.patch &&
                'border-warning'
            }`}
        >
            <h5 className="card-title">
                <ConstraintType constraint={props.constraint} /> constraint
            </h5>

            {props.constraint.semver.wildcard === true && props.constraint.semver.major === '*' ? (
                <h6 className="card-subtitle mb-3 text-muted">Constraint will be satisfied by any version.</h6>
            ) : (
                <h6 className="card-subtitle mb-3 text-muted">
                    Constraint will be satisfied by versions matching <code>{props.constraint.semver.raw}</code>.
                </h6>
            )}

            {props.constraint.semver.caret === true && <ExplainConstraintCaret constraint={props.constraint} />}

            {props.constraint.semver.tilde === true && <ExplainConstraintTilde constraint={props.constraint} />}

            {props.constraint.semver.pessimistic === true && (
                <ExplainConstraintPessimistic constraint={props.constraint} />
            )}

            {props.constraint.semver.strict === true && <ExplainConstraintStrict constraint={props.constraint} />}

            {props.constraint.semver.hyphen === true && <ExplainConstraintHyphen constraint={props.constraint} />}

            {props.constraint.semver.wildcard === true && <ExplainConstraintWildcard constraint={props.constraint} />}

            {props.constraint.semver.range === true && <ExplainConstraintRange constraint={props.constraint} />}
        </Card>
    );
};

ExplainConstraint.propTypes = {
    constraint: PropTypes.object.isRequired,
};

export default ExplainConstraint;
