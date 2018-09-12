// @flow

import React, { type Node, type ComponentType } from 'react';
import { connect } from 'react-redux';
import ExplainConstraint from './ExplainConstraint';
import ExplainVersion from './ExplainVersion';

type ExplainProps = {
    className: string,
};

type ConnectedExplainProps = {
    constraint: Object,
    version: Object,
};

export const Explain = (props: ExplainProps & ConnectedExplainProps): Node => (
    <section className={`row ${props.className}`}>
        <div className="col-6">
            {props.constraint.semver !== null && <ExplainConstraint constraint={props.constraint} />}
        </div>
        <div className="col-6">
            {props.version.semver !== null && <ExplainVersion constraint={props.constraint} version={props.version} />}
        </div>
    </section>
);

Explain.defaultProps = {
    className: '',
};

export default (connect(state => state)(Explain): ComponentType<ExplainProps>);
