// @flow

import React, { type Node } from 'react';

type AlertProps = {
    className: string,
    warning: boolean,
    error: boolean,
    children: Node,
};

const Alert = (props: AlertProps): Node => {
    const type = props.warning === true ? 'warning' : props.error === true ? 'danger' : 'info';

    return <div className={`alert alert-${type} ${props.className}`}>{props.children}</div>;
};

Alert.defaultProps = {
    className: '',
    warning: false,
    error: false,
};

export default Alert;
