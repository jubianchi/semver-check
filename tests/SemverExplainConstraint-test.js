jest.dontMock('../src/components/semver-explain-constraint.jsx');
jest.dontMock('../src/libs/semver-constraint.js');

describe('SemverExplainConstraint', function() {
    var React = require('react/addons');
    var SemverExplainConstraint = require('../src/components/semver-explain-constraint.jsx');
    var TestUtils = React.addons.TestUtils;

    it('should display constraint type', function() {
        var constraints = {
            '1.0.5 || 1.0.9': 'range (advanced)',
            '1.0.0 - 2.0.0': 'range (hyphen)',
            '1.0.*': 'wildcard',
            '1.0.x': 'wildcard',
            '1.0.X': 'wildcard',
            '1.0': 'wildcard',
            '~1.0.0': 'range (tilde)',
            '^1.0.0': 'range (caret)',
            '^1.x': 'range (caret)'
        };

        Object.keys(constraints).forEach(function (constraint) {
            var explain = TestUtils.renderIntoDocument(SemverExplainConstraint({
                constraint: constraint
            }));

            expect(explain.getDOMNode().textContent).toContain(constraint + ' is a ' + constraints[constraint] + ' constraint');
        });
    });
});
