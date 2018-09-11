import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExplainConstraint from './ExplainConstraint';
import ExplainVersion from './ExplainVersion';

export const Explain = props => (
    <section className={`row ${props.className || ''}`}>
        <div className="col-6">
            {props.constraint.semver !== null && <ExplainConstraint constraint={props.constraint} />}
        </div>
        <div className="col-6">
            {props.version.semver !== null && <ExplainVersion constraint={props.constraint} version={props.version} />}
        </div>
    </section>
);

Explain.propTypes = {
    className: PropTypes.string,
    constraint: PropTypes.object,
    version: PropTypes.object,
};

export default connect(state => state)(Explain);
