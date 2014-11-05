jest.dontMock('../src/components/semver-explain.jsx');

describe('SemverExplain', function() {
    var React = require('react/addons');
    var SemverExplain = require('../src/components/semver-explain.jsx');
    var TestUtils = React.addons.TestUtils;

    it('should explain version constraint', function() {
        var explain = TestUtils.renderIntoDocument(<SemverExplain version="1.0.0" constraint="1.0.0" />);

        expect(explain.getDOMNode().textContent).toContain('1.0.0 is a version constraint.');
    });

    it('should explain caret range constraint', function() {
        var explain = TestUtils.renderIntoDocument(<SemverExplain version="1.0.0" constraint="^1.0.0" />);

        expect(explain.getDOMNode().textContent).toContain('1.0.0 is a range (caret) constraint.');
    });
});
