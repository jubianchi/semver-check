import { push } from 'connected-react-router';

export const VERSION = 'VERSION';
export const CONSTRAINT = 'CONSTRAINT';

export const version = version => ({ type: VERSION, version });
export const constraint = constraint => ({ type: CONSTRAINT, constraint });

export const pushVersion = version => (dispatch, getState) => {
    const state = getState();

    if (version && state.constraint.constraint) {
        dispatch(push(`/${encodeURIComponent(state.constraint.constraint)}/${encodeURIComponent(version)}`));
    } else if (version) {
        dispatch(push(`/version/${encodeURIComponent(version)}`));
    } else if (state.constraint.constraint) {
        dispatch(push(`/constraint/${encodeURIComponent(state.constraint.constraint)}`));
    } else {
        dispatch(push(`/`));
    }
};

export const pushConstraint = constraint => (dispatch, getState) => {
    const state = getState();

    if (constraint && state.version.version) {
        dispatch(push(`/${encodeURIComponent(constraint)}/${encodeURIComponent(state.version.version)}`));
    } else if (constraint) {
        dispatch(push(`/constraint/${encodeURIComponent(constraint)}`));
    } else if (state.version.version) {
        dispatch(push(`/version/${encodeURIComponent(state.version.version)}`));
    } else {
        dispatch(push(`/`));
    }
};
