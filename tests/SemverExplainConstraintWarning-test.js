jest.dontMock('../src/components/semver-explain-constraint-warning.jsx');
jest.dontMock('../src/components/semver-if.jsx');
jest.dontMock('../src/libs/semver-constraint.js');

describe('SemverExplainConstraintWarning', function() {
    var React = require('react/addons');
    var SemverExplainConstraintWarning = require('../src/components/semver-explain-constraint-warning.jsx');
    var TestUtils = React.addons.TestUtils;

    var unboundConstraints = ['*', '>1.2.3', '>=1.2.3'];
    unboundConstraints.forEach(function (constraint) {
        it('should display warning for ' + constraint, function() {
            var explain = TestUtils.renderIntoDocument(SemverExplainConstraintWarning({
                constraint: constraint
            }));

            expect(explain.getDOMNode().textContent).toContain('This constraint does not provide an upper bound');
        });
    });

    var boundConstraints = ['1.2.3', '~1.0.0', '^1.0.0', '^1.x', '<1.2.3', '<=1.2.3'];
    boundConstraints.forEach(function (constraint) {
        it('should not display warning for ' + constraint, function() {
            var explain = TestUtils.renderIntoDocument(SemverExplainConstraintWarning({
                constraint: constraint
            }));

            expect(explain.getDOMNode().textContent).not.toContain('This constraint does not provide an upper bound');
        });
    });
});
