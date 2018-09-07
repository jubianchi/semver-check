import React from 'react';
import PropTypes from 'prop-types';

const WhyStrict = props => (
    <div className={`row ${props.className}`}>
        <div className="col-12">
            <h2 id="why-strict">WHY USING STRICT CONSTRAINT IS BAD?</h2>

            <p>
                Strict constraint (or fully qualified constraint) are those constraints matching only one version. In
                most case it is a bad idea to use them.
            </p>

            <p>
                Why? Because with them you are locking your dependency to a specific patch release which means you won't
                ever get bug fixes when updating your dependencies.
            </p>

            <p>
                Moreover, using strict constraint will make the work of some dependency managers harder: if you are
                depending on a package and have a dependency in common, if both of you require this common dependency
                strictly, your manager won't be able to choose an appropriate version, satisfying every constraint.
            </p>

            <p>Unless you know exactly what you are doing and why, you should change to a more flexible one like:</p>

            <ul>
                <li>
                    <code>~x.y.z</code> if your dependency manager supports tilde-range constraints
                </li>
                <li>
                    <code>&gt;=x.y.z &lt;x.(y+1).0</code> if your dependency manager supports range constraints
                </li>
            </ul>

            <p>
                Using such constraints, you will allow your dependency manager to pull patch releases letting you get
                bug fixes. If the library you are depending on strictly implements Semantic Versioning you should be
                able to make your constraint even more flexible by allowing your dependency manager to also pull new
                features:
            </p>

            <ul>
                <li>
                    <code>^x.y.z</code> if your dependency manager supports caret-range constraints
                </li>
                <li>
                    <code>&gt;=x.y.z &lt;(x+1).0.0</code> if your dependency manager support range constraints
                </li>
            </ul>
        </div>
    </div>
);

WhyStrict.propTypes = {
    className: PropTypes.string,
};

WhyStrict.defaultProps = {
    className: '',
};

export default WhyStrict;
