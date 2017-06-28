jest.dontMock('../src/components/semver-feedback.jsx');

describe('SemverFeedback', function() {
    var React = require('react/addons');
    var SemverFeedback = React.createFactory(require('../src/components/semver-feedback.jsx'));
    var TestUtils = React.addons.TestUtils;

    it('should give success feedback', function() {
        var feedback = TestUtils.renderIntoDocument(SemverFeedback({
            satisfies: true,
            version: "X",
            constraint: "Y"
        }));

        expect(feedback.getDOMNode().textContent).toContain('X satisfies constraint Y');
    });

    it('should give error feedback', function() {
        var feedback = TestUtils.renderIntoDocument(SemverFeedback({
            satisfies: false,
            version: "X",
            constraint: "Y"
        }));

        expect(feedback.getDOMNode().textContent).toContain('X does not satisfy constraint Y');
    });

    it('should give initial feedback', function() {
        var feedback = TestUtils.renderIntoDocument(SemverFeedback());

        expect(feedback.getDOMNode().textContent).toContain('Enter a constraint and a version to check if they match');
    });
});
