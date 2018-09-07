import React from 'react';
import { render } from 'enzyme';
import ExplainConstraint from './ExplainConstraint';

describe('ExplainConstraint', () => {
    it('should display caret constraints', () => {
        const props = {
            constraint: {
                constraint: '^1.0.0',
                semver: {
                    caret: true,
                },
            },
        };

        var node = render(<ExplainConstraint {...props} />);
        expect(node.text()).toContain(props.constraint.constraint + ' is a caret constraint');
    });

    it('should display tilde constraints', () => {
        const props = {
            constraint: {
                constraint: '~1.0.0',
                semver: {
                    tilde: true,
                },
            },
        };

        var node = render(<ExplainConstraint {...props} />);
        expect(node.text()).toContain(props.constraint.constraint + ' is a tilde constraint');
    });

    it('should display pessimistic constraints', () => {
        const props = {
            constraint: {
                constraint: '~>1.0.0',
                semver: {
                    pessimistic: true,
                },
            },
        };

        var node = render(<ExplainConstraint {...props} />);
        expect(node.text()).toContain(props.constraint.constraint + ' is a pessimistic constraint');
    });

    it('should display strict constraints', () => {
        const props = {
            constraint: {
                constraint: '1.0.0',
                semver: {
                    strict: true,
                },
            },
        };

        var node = render(<ExplainConstraint {...props} />);
        expect(node.text()).toContain(props.constraint.constraint + ' is a strict constraint');
    });

    it('should display hyphen constraints', () => {
        const props = {
            constraint: {
                constraint: '1.0.0 - 2.0.0',
                semver: {
                    hyphen: true,
                },
            },
        };

        var node = render(<ExplainConstraint {...props} />);
        expect(node.text()).toContain(props.constraint.constraint + ' is a hyphen constraint');
    });

    it('should display wildcard (x-range) constraints', () => {
        const props = {
            constraint: {
                constraint: '1.0.*',
                semver: {
                    wildcard: true,
                },
            },
        };

        var node = render(<ExplainConstraint {...props} />);
        expect(node.text()).toContain(props.constraint.constraint + ' is a x-range constraint');
    });

    it('should display range constraints', () => {
        const props = {
            constraint: {
                constraint: '1.0.0 <1.5.0',
                semver: {
                    range: true,
                    raw: '>=1.0.0 <1.5.0',
                },
            },
        };

        var node = render(<ExplainConstraint {...props} />);
        expect(node.text()).toContain(props.constraint.constraint + ' is a range constraint');
    });
});
