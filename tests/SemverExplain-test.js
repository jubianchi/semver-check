jest.dontMock('../src/components/semver-explain.jsx');
jest.dontMock('../src/libs/semver-constraint.js');

describe('SemverExplain', function() {
    var React = require('react/addons');
    var SemverExplain = require('../src/components/semver-explain.jsx');
    var TestUtils = React.addons.TestUtils;

    describe('version constraint', function() {
        it('explain type', function() {
            var explain = TestUtils.renderIntoDocument(SemverExplain({
                version: "1.0.0",
                constraint: "1.0.0"
            }));

            expect(explain.getDOMNode().textContent).toContain('1.0.0 is a version constraint.');
        });
    });

    describe('version infos', function() {
        it('display next releases', function() {
            var explain = TestUtils.renderIntoDocument(SemverExplain({
                version: "1.0.0",
                constraint: "1.0.0"
            }));

            expect(explain.getDOMNode().textContent).toContain('The next major release will be 2.0.0');
            expect(explain.getDOMNode().textContent).toContain('The next minor release will be 1.1.0');
            expect(explain.getDOMNode().textContent).toContain('The next patch release will be 1.0.1');
        });
    });

    describe('advanced range constraint', function() {
        it('explain type', function() {
            var explain = TestUtils.renderIntoDocument(SemverExplain({
                version: "1.0.0",
                constraint: "1.0.5 || 1.0.9"
            }));

            expect(explain.getDOMNode().textContent).toContain('1.0.5 || 1.0.9 is a range (advanced) constraint.');
        });
    });

    describe('hyphen-range constraint', function() {
        it('explain type', function() {
            var explain = TestUtils.renderIntoDocument(SemverExplain({
                version: "1.0.0",
                constraint: "1.0.0 - 2.0.0"
            }));

            expect(explain.getDOMNode().textContent).toContain('1.0.0 - 2.0.0 is a range (hyphen) constraint.');
        });

        var ranges = {
            '1.2.3 - 2.3.4': '>=1.2.3 <=2.3.4',
            '1.2 - 2.3.4': '>=1.2.0 <=2.3.4',
            '1.2.3 - 2.3': '>=1.2.3 <2.4.0',
            '1.2.3 - 2': '>=1.2.3 <3.0.0'
        };

        Object.keys(ranges).forEach(function(key) {
            it('explain range ' + key, function() {
                var explain = TestUtils.renderIntoDocument(SemverExplain({
                    version: "1.0.0",
                    constraint: key
                }));

                expect(explain.getDOMNode().textContent).toContain('will be satisfied by any version matching ' + ranges[key]);
            });
        });
    });

    describe('x-range (wildcard) constraint', function() {
        it('explain type', function() {
            var explain = TestUtils.renderIntoDocument(SemverExplain({
                version: "1.0.0",
                constraint: "1.0.*"
            }));

            expect(explain.getDOMNode().textContent).toContain('1.0.* is a wildcard constraint.');
        });

        var ranges = {
            '*': '>=0.0.0',
            '1.*': '>=1.0.0 <2.0.0',
            '1.2.*': '>=1.2.0 <1.3.0',
            'x': '>=0.0.0',
            '1.x': '>=1.0.0 <2.0.0',
            '1.2.x': '>=1.2.0 <1.3.0',
            '1': '>=1.0.0 <2.0.0',
            '1.2': '>=1.2.0 <1.3.0'
        };

        Object.keys(ranges).forEach(function(key) {
            it('explain range ' + key, function() {
                var explain = TestUtils.renderIntoDocument(SemverExplain({
                    version: "1.0.0",
                    constraint: key
                }));

                expect(explain.getDOMNode().textContent).toContain('will be satisfied by any version matching ' + ranges[key]);
            });
        });
    });

    describe('tilde-range constraint', function() {
        it('explain type', function() {
            var explain = TestUtils.renderIntoDocument(SemverExplain({
                version: "1.0.0",
                constraint: "~1.0.0"
            }));

            expect(explain.getDOMNode().textContent).toContain('~1.0.0 is a range (tilde) constraint.');
        });

        var ranges = {
            '~1.2.3': '>=1.2.3 <1.3.0',
            '~1.2': '>=1.2.0 <1.3.0',
            '~1': '>=1.0.0 <2.0.0',
            '~0.2.3': '>=0.2.3 <0.3.0',
            '~0.2': '>=0.2.0 <0.3.0',
            '~0': '>=0.0.0 <1.0.0',
            '~1.2.3-beta.2': '>=1.2.3-beta.2 <1.3.0'
        };

        Object.keys(ranges).forEach(function(key) {
            it('explain range ' + key, function() {
                var explain = TestUtils.renderIntoDocument(SemverExplain({
                    version: "1.0.0",
                    constraint: key
                }));

                expect(explain.getDOMNode().textContent).toContain('will be satisfied by any version matching ' + ranges[key]);
            });
        });
    });

    describe('caret-range constraint', function() {
        it('explain type', function() {
            var explain = TestUtils.renderIntoDocument(SemverExplain({
                version: "1.0.0",
                constraint: "^1.0.0"
            }));

            expect(explain.getDOMNode().textContent).toContain('^1.0.0 is a range (caret) constraint.');
        });

        var ranges = {
            '^1.2.3': '>=1.2.3 <2.0.0',
            '^0.2.3': '>=0.2.3 <0.3.0',
            '^0.0.3': '>=0.0.3 <0.0.4',
            '^1.2.3-beta.2': '>=1.2.3-beta.2 <2.0.0',
            '^1.2.x': '>=1.2.0 <2.0.0',
            '^0.0.x': '>=0.0.0 <0.1.0',
            '^0.0': '>=0.0.0 <0.1.0',
            '^1.x': '>=1.0.0 <2.0.0',
            '^0.x': '>=0.0.0 <1.0.0'
        };

        Object.keys(ranges).forEach(function(key) {
            it('explain range ' + key, function() {
                var explain = TestUtils.renderIntoDocument(SemverExplain({
                    version: "1.0.0",
                    constraint: key
                }));

                expect(explain.getDOMNode().textContent).toContain('will be satisfied by any version matching ' + ranges[key]);
            });
        });
    });
});
