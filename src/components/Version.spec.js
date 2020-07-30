import React from 'react';
import { render, shallow } from 'enzyme';
import Version from './Version';
import { DebounceInput } from 'react-debounce-input';

describe('Version', () => {
    it('should render an input', () => {
        const props = {
            version: '',
            onVersion: () => {},
        };

        var node = render(<Version {...props} />);
        expect(node.find('input').length).toBe(1);
    });

    it('should render the default value', () => {
        const props = {
            version: '1.0.0',
            onVersion: () => {},
        };

        var node = render(<Version {...props} />);
        expect(node.find('input').prop('value')).toBe(props.version);
    });

    it('should have invalid style', () => {
        const props = {
            version: 'x.y.z',
            semver: null,
            onVersion: () => {},
        };

        var node = render(<Version {...props} />);
        expect(node.find('input').hasClass('is-invalid')).toBe(true);
    });

    it('should have valid style', () => {
        const props = {
            version: '1.0.0',
            semver: {
                raw: '1.0.0',
            },
            onVersion: () => {},
        };

        var node = render(<Version {...props} />);
        expect(node.find('input').hasClass('is-valid')).toBe(true);
    });

    it('should call change handler (debounced)', done => {
        const props = {
            version: '',
            semver: null,
            onVersion: jest.fn(),
        };

        const event = {
            persist: () => {},
            target: {
                value: '1.0.0',
            },
        };

        var node = shallow(<Version {...props} />);

        node.find(DebounceInput).shallow().find('input').simulate('change', event);

        setTimeout(() => {
            expect(props.onVersion).toHaveBeenCalled();

            done();
        }, 300);
    });
});
