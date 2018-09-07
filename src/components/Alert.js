import React from 'react';
import PropTypes from 'prop-types';

const Alert = props => {
    const type = props.warning === true ? 'warning' : props.error === true ? 'danger' : 'info';

    return <div className={`alert alert-${type} ${props.className}`}>{props.children}</div>;
};

Alert.propTypes = {
    className: PropTypes.string,
    warning: PropTypes.bool,
    error: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

Alert.defaultProps = {
    warning: false,
    error: false,
};

export default Alert;
