import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ConstraintExplain from "./ExplainConstraint";
import VersionExplain from "./ExplainVersion";

export const Explain = (props) => (
    <section className={`row ${props.className || ''}`}>
        <div className="col-6">
            { props.constraint.semver !== null && <ConstraintExplain {...props}/> }
        </div>
        <div className="col-6">
            { props.version.semver !== null && <VersionExplain {...props}/> }
        </div>
    </section>
);

Explain.propTypes = {
    className: PropTypes.string,
    constraint: PropTypes.object,
    version: PropTypes.object,
};

export default connect(
    state => state
)(Explain);