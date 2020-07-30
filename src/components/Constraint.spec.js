import React from 'react';
import { render, shallow } from 'enzyme';
import Constraint from './Constraint';
import { DebounceInput } from 'react-debounce-input';

describe('Constraint', () => {
    it('should render an input', () => {
        const props = {
            onConstraint: () => {},
        };

        var node = render(<Constraint {...props} />);
        expect(node.find('input').length).toBe(1);
    });

    it('should render the default value', () => {
        const props = {
            constraint: '1.0.0',
            onConstraint: () => {},
        };

        var node = render(<Constraint {...props} />);
        expect(node.find('input').prop('value')).toBe(props.constraint);
    });

    it('should have invalid style', () => {
        const props = {
            constraint: 'x.y.z',
            semver: null,
            onConstraint: () => {},
        };

        var node = render(<Constraint {...props} />);
        expect(node.find('input').hasClass('is-invalid')).toBe(true);
    });

    it('should have valid style', () => {
        const props = {
            constraint: '1.0.0',
            semver: {
                raw: '1.0.0',
            },
            onConstraint: () => {},
        };

        var node = render(<Constraint {...props} />);
        expect(node.find('input').hasClass('is-valid')).toBe(true);
    });

    it('should call change handler (debounced)', done => {
        const props = {
            constraint: '',
            semver: null,
            onConstraint: jest.fn(),
        };

        const event = {
            persist: () => {},
            target: {
                value: '1.0.0',
            },
        };

        var node = shallow(<Constraint {...props} />);

        node.find(DebounceInput).shallow().find('input').simulate('change', event);

        setTimeout(() => {
            expect(props.onConstraint).toHaveBeenCalled();

            done();
        }, 300);
    });
});
