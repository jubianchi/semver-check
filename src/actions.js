export const VERSION = 'VERSION';
export const CONSTRAINT = 'CONSTRAINT';

export const version = version => ({ type: VERSION, version });
export const constraint = constraint => ({ type: CONSTRAINT, constraint });