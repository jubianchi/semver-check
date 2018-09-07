import React from 'react';
import PropTypes from 'prop-types';
import Quote from './Quote';

const WhyLoose = props => (
    <div className={`row ${props.className}`}>
        <div className="col-12">
            <h2 id="why-loose">WHY USING LOOSE CONSTRAINT IS BAD?</h2>

            <p>
                Loose constraint are those constraints matching any version greater than a given one. It is a very bad
                idea to use them.
            </p>

            <p>
                Why? Because with them you are only giving a lower bound to your dependency's version, which means every
                version greater than the one you chose, be it a patch, minor or major release. If we read Semantic
                Versioning carefully:
            </p>

            <Quote author="semver.org" source="//semver.org/">
                <ol start="8">
                    <li>
                        Major version X (x.y.z | x &gt; 0) MUST be incremented if any backwards incompatible changes are
                        introduced to the public API. It MAY include minor and patch level changes. Patch and minor
                        version MUST be reset to 0 when major version is incremented.
                    </li>
                </ol>
            </Quote>

            <p>
                What does this mean? It means that major releases <strong>may</strong> break backward compatibility.
                With a loose constraint you will get those releases and the BC break they introduce. This is likely not
                what you want!
            </p>
        </div>
    </div>
);

WhyLoose.propTypes = {
    className: PropTypes.string,
};

WhyLoose.defaultProps = {
    className: '',
};

export default WhyLoose;
