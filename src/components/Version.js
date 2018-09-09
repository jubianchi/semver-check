import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';

export default class Version extends Component {
    static propTypes = {
        onVersion: PropTypes.func.isRequired,
        version: PropTypes.string,
        semver: PropTypes.object,
    };

    static defaultProps = {
        version: '',
        semver: null,
    };

    constructor() {
        super();

        this.handleInput = this.handleInput.bind(this);
    }

    handleInput({ target: { value: version } }) {
        this.props.onVersion(version);
    }

    shouldComponentUpdate(prevProps) {
        return prevProps.version !== this.props.version;
    }

    render() {
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
