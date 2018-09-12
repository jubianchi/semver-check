// @flow

import React, { Component, type Node } from 'react';
import { DebounceInput } from 'react-debounce-input';

type ConstraintProp = {
    onConstraint: (constraint: string) => void,
    constraint: string,
    semver: Object,
};

export default class Constraint extends Component<ConstraintProp> {
    static defaultProps = {
        constraint: '',
        semver: null,
    };

    handleInput = ({ target }: { target: HTMLInputElement }): void => {
        this.props.onConstraint(target.value);
    };

    shouldComponentUpdate(prevProps: ConstraintProp): boolean {
        return prevProps.constraint !== this.props.constraint;
    }

    render(): Node {
        const valid = this.props.semver !== null;

        return (
            <div className="form-group">
                <label>Constraint</label>
                <DebounceInput
                    className={`form-control ${valid ? 'is-valid' : 'is-invalid'}`}
                    type="text"
                    placeholder="^1.0.0"
                    onChange={this.handleInput}
                    value={this.props.constraint}
                    debounceTimeout={150}
                />
            </div>
        );
    }
}
