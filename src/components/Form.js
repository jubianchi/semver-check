import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Constraint from './Constraint';
import Version from './Version';
import { pushVersion, pushConstraint } from '../actions';

export const Form = props => (
    <section className={`row ${props.className || ''}`}>
        <div className="col">
            <Constraint onConstraint={props.onConstraint} {...props.constraint} />
        </div>
        <div className="col">
            <Version onVersion={props.onVersion} {...props.version} />
        </div>
    </section>
);

Form.propTypes = {
    className: PropTypes.string,
    onConstraint: PropTypes.func.isRequired,
    onVersion: PropTypes.func.isRequired,
    constraint: PropTypes.object,
    version: PropTypes.object,
};

export default connect(
    state => state,
    dispatch => ({
        onConstraint: value => dispatch(pushConstraint(value)),
        onVersion: value => dispatch(pushVersion(value)),
    }),
)(Form);
