import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const WhatYouGet = props => {
    if (props.major === false && props.minor === false && props.patch === false) {
        return null;
    }

    return (
        <Fragment>
            <p className="card-text mb-1">Given the constraint you entered, you will get:</p>

            <ul>
                {props.major && (
                    <li>
                        The next <strong>major</strong> releases which may introduce <strong>breaking changes</strong>
                    </li>
                )}
                {props.minor && (
                    <li>
                        The next <strong>minor</strong> releases which will provide <strong>new features</strong>
                    </li>
                )}
                {props.patch && (
                    <li>
                        The next <strong>patch</strong> releases which will <strong>fix bugs</strong>
                    </li>
                )}
            </ul>
        </Fragment>
    );
};

WhatYouGet.propTypes = {
    major: PropTypes.bool,
    minor: PropTypes.bool,
    patch: PropTypes.bool,
};

WhatYouGet.defaultProps = {
    major: false,
    minor: false,
    patch: false,
};

export default WhatYouGet;
