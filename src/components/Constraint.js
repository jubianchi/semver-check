import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';

export default class Constraint extends Component {
    static propTypes = {
        onConstraint: PropTypes.func.isRequired,
        constraint: PropTypes.string,
        semver: PropTypes.object,
    };

    static defaultProps = {
        constraint: '',
        semver: null,
    };

    constructor() {
        super();

        this.handleInput = this.handleInput.bind(this);
    }

    handleInput({ target: { value: constraint } }) {
        this.props.onConstraint(constraint);
    }

    shouldComponentUpdate(prevProps) {
        return prevProps.constraint !== this.props.constraint;
    }

    render() {
        const valid = this.props.semver !== null;

        return (
            <Fragment>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span
                            className={`input-group-text text-light ${
                                valid ? 'bg-success border-success' : 'bg-danger border-danger'
                            }`}
                        >
                            Constraint
                        </span>
                    </div>
                    <DebounceInput
                        className={`form-control ${valid ? 'is-valid' : 'is-invalid'}`}
                        type="text"
                        placeholder="^1.0.0"
                        onChange={this.handleInput}
                        value={this.props.constraint}
                        debounceTimeout={150}
                    />
                </div>
                {valid || <small className="form-text text-danger">This constraint is invalid.</small>}
            </Fragment>
        );
    }
}
