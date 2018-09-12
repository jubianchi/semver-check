import React, { type Node, type ComponentType } from 'react';
import { connect } from 'react-redux';
import Constraint from './Constraint';
import Version from './Version';
import { pushVersion, pushConstraint } from '../actions';

type FormProps = {
    className: string,
};

type ConnectedFormProps = {
    onConstraint: (constraint: string) => void,
    onVersion: (version: string) => void,
    constraint: Object,
    version: Object,
};

export const Form = (props: FormProps & ConnectedFormProps): Node => (
    <section className={`row ${props.className || ''}`}>
        <div className="col-6">
            <Constraint
                onConstraint={props.onConstraint}
                constraint={props.constraint.constraint}
                semver={props.constraint.semver}
            />
        </div>
        <div className="col-6">
            <Version onVersion={props.onVersion} version={props.version.version} semver={props.version.semver} />
        </div>
    </section>
);

Form.defaultProps = {
    className: '',
    constraint: null,
    version: null,
};

export default (connect(
    state => state,
    dispatch => ({
        onConstraint: value => dispatch(pushConstraint(value)),
        onVersion: value => dispatch(pushVersion(value)),
    }),
)(Form): ComponentType<FormProps>);
