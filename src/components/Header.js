import React from 'react';

export default props => (
    <header className={`row ${props.className || ''}`}>
        <div className="col-12 text-center">
            <h1>Semver check</h1>
        </div>
    </header>
);
