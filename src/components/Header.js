// @flow

import React, { type Node } from 'react';

type HeaderProps = {
    className: string,
};

const Header = (props: HeaderProps): Node => (
    <header className={`row ${props.className || ''}`}>
        <div className="col-12 text-center">
            <h1>Semver check</h1>
        </div>
    </header>
);

Header.defaultProps = {
    className: '',
};

export default Header;
