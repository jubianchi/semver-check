import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import Constraint from './Constraint';
import Version from './Version';
import withSemver from '../hoc/withSemver';

const withOnParamsChange = () => (C) => {
  class OnParamsChange extends Component {
    static propTypes = {
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
      semver: PropTypes.shape({
        constraint: PropTypes.shape({}),
        version: PropTypes.shape({}),
      }).isRequired,
    }
    handleChange = ({ constraint: newConstraint, version: newVersion }) => {
      const {
        history: { push },
        semver: { constraint: { constraint }, version: { version } },
      } = this.props;

      const params = {
        constraint: newConstraint || constraint,
        version: newVersion || version,
      };

      switch (true) {
        case params.constraint.length > 0 && params.version.length > 0:
          push(`/${encodeURIComponent(params.constraint)}/${encodeURIComponent(params.version)}`);

          return;
        case params.constraint.length > 0:
          push(`/constraint/${encodeURIComponent(params.constraint)}`);

          return;
        case params.version.length > 0:
          push(`/version/${encodeURIComponent(params.version)}`);

          return;
        default:
          console.warn('no constraint nor version has changed');

          return;
      }
    }
    render() {
      return (
        <C {...this.props} onParamsChange={this.handleChange} />
      );
    }
  }

  return compose(
    withSemver(),
    withRouter
  )(OnParamsChange);
}

class Form extends Component {
  static propTypes = {
      className: PropTypes.string,
      onParamsChange: PropTypes.func.isRequired,
      semver: PropTypes.shape({
        constraint: PropTypes.shape({}),
        version: PropTypes.shape({}),
      }).isRequired,
  }

  render() {
    const { onParamsChange, className, semver: { version, constraint } } = this.props;

    return (
      <section className={`row ${className || ''}`}>
          <div className="col-6">
              <Constraint onConstraint={onParamsChange} {...constraint} />
          </div>
          <div className="col-6">
              <Version onVersion={onParamsChange} {...version} />
          </div>
      </section>
    );
  }
}

export default compose(
  withSemver(),
  withOnParamsChange()
)(Form);
