import React from 'react';
import { shallow } from 'enzyme';
import { Explain } from './Explain';
import ExplainVersion from './ExplainVersion';
import ExplainConstraint from './ExplainConstraint';

describe('Explain', () => {
    it('should render constraint explanation', () => {
        const props = {
            semver: {
              version: {},
              constraint: {
                  semver: {},
              },
            },
        };

        var node = shallow(<Explain {...props} />);
        expect(node.find(ExplainConstraint).length).toBe(1);
    });

    it('should render both', () => {
        const props = {
          semver: {
            version: {
                semver: {},
            },
            constraint: {
                semver: {},
            },
          },
        };

        var node = shallow(<Explain {...props} />);
        expect(node.find(ExplainVersion).length).toBe(1);
        expect(node.find(ExplainConstraint).length).toBe(1);
    });
});
