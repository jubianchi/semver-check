import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import semver from '../semver';

export default () => (C) => {
  class Semver extends Component {
    static propTypes = {
      match: PropTypes.shape({
        params: PropTypes.shape({
          constraint: PropTypes.string,
          version: PropTypes.string,
        }),
      }),
    }

    render() {
      const { match: { params: { constraint = '', version = ''} } } = this.props;

      const semverParams = {
        constraint: {
          constraint,
          semver: semver.coerceRange(semver.cleanRange(constraint)),
        },
        version: {
          version,
          semver: semver.coerce(semver.clean(version)),
        },
      };

      return (
        <C {...this.props} semver={semverParams} />
      );
    }
  }

  return withRouter(Semver);
};
