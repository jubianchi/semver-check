import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';

const Constraint = props => {
    const handleInput = ({ target: { value: constraint } }) => {
        props.onConstraint(constraint);
    };

    const valid = props.semver !== null;

    return (
        <div className="form-group">
            <label>Constraint</label>
            <DebounceInput
                className={`form-control ${valid ? 'is-valid' : 'is-invalid'}`}
                type="text"
                placeholder="^1.0.0"
                onChange={handleInput}
                value={props.constraint}
                debounceTimeout={150}
            />
        </div>
    );
};

Constraint.propTypes = {
    onConstraint: PropTypes.func.isRequired,
    constraint: PropTypes.string,
    semver: PropTypes.object,
};

Constraint.defaultProps = {
    constraint: '',
    semver: null,
};

export default Constraint;
