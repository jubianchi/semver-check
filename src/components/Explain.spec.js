import React from 'react';
import { shallow } from 'enzyme';
import { Explain } from './Explain';
import ExplainVersion from './ExplainVersion';
import ExplainConstraint from './ExplainConstraint';

describe('Explain', () => {
    it('should render version explanation', () => {
        const props = {
            version: {
                semver: {},
            },
            constraint: {},
        };

        var node = shallow(<Explain {...props} />);
        expect(node.find(ExplainVersion).length).toBe(1);
    });

    it('should render constraint explanation', () => {
        const props = {
            version: {},
            constraint: {
                semver: {},
            },
        };

        var node = shallow(<Explain {...props} />);
        expect(node.find(ExplainConstraint).length).toBe(1);
    });

    it('should render both', () => {
        const props = {
            version: {
                semver: {},
            },
            constraint: {
                semver: {},
            },
        };

        var node = shallow(<Explain {...props} />);
        expect(node.find(ExplainVersion).length).toBe(1);
        expect(node.find(ExplainConstraint).length).toBe(1);
    });
});
