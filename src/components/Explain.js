import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withSemver from '../hoc/withSemver';
import ExplainConstraint from './ExplainConstraint';
import ExplainVersion from './ExplainVersion';

export class Explain extends PureComponent {
  propTypes = {
      className: PropTypes.string,
      semver: PropTypes.shape({
        constraint: PropTypes.object.isRequired,
        version: PropTypes.object.isRequired,
      }).isRequired,
  }

  render() {
    const { className, semver: { constraint, version } } = this.props;

    return (
        <section className={`row ${className || ''}`}>
            <div className="col-6">{constraint.semver !== null && <ExplainConstraint constraint={constraint} />}</div>
            <div className="col-6">{version.semver !== null && <ExplainVersion version={version} />}</div>
        </section>
    );
  }
}

export default withSemver()(Explain);
