import React from 'react';
import PropTypes from 'prop-types';

const Implementations = props => (
    <div className={`row ${props.className}`}>
        <div className="col-12">
            <h2>SEMVER CONSTRAINT IMPLEMENTATIONS</h2>

            <p>
                Semantic Versioning stands as a standard versioning scheme but it does not (
                <a href="https://github.com/mojombo/semver/issues/113">yet</a>) cover dependency management and how to
                express constraint.
            </p>

            <p>
                Without any formal specification about constraint, dependency managers sometimes handle or express them
                differently. For example, the tilde-range constraint (<code>~x.y</code>) does not work the same way in{' '}
                <a href="https://www.npmjs.org/">NPM</a> and <a href="https://getcomposer.org">Composer</a>.
            </p>

            <ul>
                <li>
                    See how <a href="https://www.npmjs.org/">NPM</a> handles constraints:{' '}
                    <a href="https://github.com/npm/node-semver">npm/node-semver</a>
                </li>
                <li>
                    See how <a href="https://getcomposer.org/">Composer</a> handles constraints:{' '}
                    <a href="https://getcomposer.org/doc/01-basic-usage.md#package-version-constraints">
                        Package Versions
                    </a>
                </li>
                <li>
                    See how <a href="http://bundler.io/">Bundler</a> handles constraints:{' '}
                    <a href="http://guides.rubygems.org/patterns/#pessimistic-version-constraint">
                        Pessimistic version constraint
                    </a>
                </li>
            </ul>
        </div>
    </div>
);

Implementations.propTypes = {
    className: PropTypes.string,
};

Implementations.defaultProps = {
    className: '',
};

export default Implementations;
