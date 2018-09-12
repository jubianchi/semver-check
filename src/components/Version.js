// @flow

import React, { Component, type Node } from 'react';
import { DebounceInput } from 'react-debounce-input';

type VersionProps = {
    onVersion: (version: string) => void,
    version: string,
    semver: Object,
};

export default class Version extends Component<VersionProps> {
    static defaultProps = {
        version: '',
        semver: null,
    };

    handleInput = ({ target }: { target: HTMLInputElement }): void => {
        this.props.onVersion(target.value);
    };

    shouldComponentUpdate(prevProps: VersionProps): boolean {
        return prevProps.version !== this.props.version;
    }

    render(): Node {
        const valid = this.props.semver !== null;

        return (
            <div className="form-group">
                <label>Version</label>
                <DebounceInput
                    className={`form-control ${valid ? 'is-valid' : 'is-invalid'}`}
                    type="text"
                    placeholder="1.0.0"
                    onChange={this.handleInput}
                    value={this.props.version}
                    debounceTimeout={150}
                />
            </div>
        );
    }
}
