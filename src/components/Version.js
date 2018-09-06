import React from 'react';
import PropTypes from 'prop-types';

const Version = (props) => {
    const handleInput = ({target: {value: version}}) => {
        props.onVersion(version);
    };

    const valid = props.semver !== null;

    return (
        <div className="form-group">
            <label>Version</label>
            <input className={`form-control ${valid ? 'is-valid' : 'is-invalid'}`}
                   type="text"
                   placeholder="1.0.0"
                   onChange={handleInput}
                   defaultValue={props.version}/>
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
    semver: null
};

export default Version;
