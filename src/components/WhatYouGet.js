// @flow

import React, { Fragment, type Node } from 'react';

type WhatYouGetProps = {
    major: boolean,
    minor: boolean,
    patch: boolean,
};

const WhatYouGet = (props: WhatYouGetProps): Node => {
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

WhatYouGet.defaultProps = {
    major: false,
    minor: false,
    patch: false,
};

export default WhatYouGet;
