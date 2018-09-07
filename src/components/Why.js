import React from 'react';
import PropTypes from 'prop-types';
import Quote from './Quote';

const Why = props => (
    <div className={`row ${props.className}`}>
        <div className="col-12">
            <h2>SEMVER CHECKER... WHY?</h2>

            <Quote author="semver.org" source="//semver.org/">
                <p>In the world of software management there exists a dread place called "dependency hell."</p>

                <p>
                    The bigger your system grows and the more packages you integrate into your software, the more likely
                    you are to find yourself, one day, in this pit of despair.
                </p>
            </Quote>

            <p>
                More and more projects try to follow Semantic Versioning to reduce package versioning nightmare and
                every dependency manager implements its own semantic versioner.{' '}
                <a href="https://getcomposer.org/">Composer</a> and <a href="https://www.npmjs.org/">NPM</a> for example
                don't handle version constraints the same way. It's hard sometimes to be sure how some library version
                will behave against some constraint.
            </p>

            <p>This tiny webapp checks if a given version satisfies another given constraint.</p>
        </div>
    </div>
);

Why.propTypes = {
    className: PropTypes.string,
};

Why.defaultProps = {
    className: '',
};

export default Why;
