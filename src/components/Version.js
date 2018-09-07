import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';

const Version = props => {
    const handleInput = ({ target: { value: version } }) => {
        props.onVersion(version);
    };

    const valid = props.semver !== null;

    return (
        <div className="form-group">
            <label>Version</label>
            <DebounceInput
                className={`form-control ${valid ? 'is-valid' : 'is-invalid'}`}
                type="text"
                placeholder="1.0.0"
                onChange={handleInput}
                value={props.version}
                debounceTimeout={150}
            />
        </div>
    );
};

Version.propTypes = {
    onVersion: PropTypes.func.isRequired,
    version: PropTypes.string,
    semver: PropTypes.object,
};

Version.defaultProps = {
    version: '',
    semver: null,
};

export default Version;
