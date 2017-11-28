jest.dontMock('../src/libs/semver-constraint.js');

describe('SemverConstraint', function() {
    var SemverConstraint = require('../src/libs/semver-constraint.js');

    it('should compute constraint operator', function() {
        expect(new SemverConstraint('1.0.0').operator()).toEqual('=');
        expect(new SemverConstraint('^1.0.0').operator()).toEqual('^');
        expect(new SemverConstraint('~1.0.0').operator()).toEqual('~');
        expect(new SemverConstraint('>1.0.0').operator()).toEqual('>');
        expect(new SemverConstraint('<1.0.0').operator()).toEqual('<');
        expect(new SemverConstraint('~>1.0.0').operator()).toEqual('~>');
    });

    it('should compute constraint parts', function() {
        expect(new SemverConstraint('1.0.0').parts()).toEqual(['1', '0', '0']);
        expect(new SemverConstraint('^1.0.0').parts()).toEqual(['1', '0', '0']);
        expect(new SemverConstraint('~1.0.0').parts()).toEqual(['1', '0', '0']);
        expect(new SemverConstraint('>1.0.0').parts()).toEqual(['1', '0', '0']);
        expect(new SemverConstraint('<1.0.0').parts()).toEqual(['1', '0', '0']);
        expect(new SemverConstraint('~>1.0.0').parts()).toEqual(['1', '0', '0']);
    });

    it('should compute cleaned version', function() {
        expect(new SemverConstraint('1.0.0').cleaned()).toEqual('1.0.0');
        expect(new SemverConstraint('^1.0.*').cleaned()).toEqual('1.0');
        expect(new SemverConstraint('~  1.0.0').cleaned()).toEqual('1.0.0');
        expect(new SemverConstraint('>1.0.0').cleaned()).toEqual('1.0.0');
        expect(new SemverConstraint('<1.0.0').cleaned()).toEqual('1.0.0');
        expect(new SemverConstraint('~>  1.0.0').parts()).toEqual(['1', '0', '0']);
    });

    it('should compute constraint type', function() {
        expect(new SemverConstraint('1.0.0').type()).toEqual('version');
        expect(new SemverConstraint('^1.0.*').type()).toEqual('range (caret)');
        expect(new SemverConstraint('~  1.0.0').type()).toEqual('range (tilde)');
        expect(new SemverConstraint('1.0.0 - 2.0.0').type()).toEqual('range (hyphen)');
        expect(new SemverConstraint('>1.0.0').type()).toEqual('range');
        expect(new SemverConstraint('<1.0.0').type()).toEqual('range');
        expect(new SemverConstraint('~>1.0.0').type()).toEqual('range (pessimistic)');
    });

    it('should cast to string', function() {
        expect(new SemverConstraint('1.0.0').toString()).toEqual('1.0.0');
        expect(new SemverConstraint('^1.x').toString()).toEqual('^1.x');
        expect(new SemverConstraint('~0.2.3').toString()).toEqual('~0.2.3');
        expect(new SemverConstraint('~>0.2.3').toString()).toEqual('~>0.2.3');
    });

    describe('lower bound', function() {
        it('should not exist on version constraint', function() {
            expect(new SemverConstraint('1.0.0').lower()).toEqual(undefined);
        });

        var ranges = {
            '1.2.3 - 2.3.4': '>=1.2.3',
            '1.2 - 2.3.4': '>=1.2.0',
            '1.2.3 - 2.3': '>=1.2.3',
            '1.2.3 - 2': '>=1.2.3',
            '*': '>=0.0.0',
            '1.*': '>=1.0.0',
            '1.2.*': '>=1.2.0',
            'x': '>=0.0.0',
            '1.x': '>=1.0.0',
            '1.2.x': '>=1.2.0',
            '1': '>=1.0.0',
            '1.2': '>=1.2.0',
            '~1.2.3': '>=1.2.3',
            '~1.2': '>=1.2.0',
            '~1': '>=1.0.0',
            '~0.2.3': '>=0.2.3',
            '~0.2': '>=0.2.0',
            '~0': '>=0.0.0',
            '~1.2.3-beta.2': '>=1.2.3-beta.2',
            '^1.2.3': '>=1.2.3',
            '^0.2.3': '>=0.2.3',
            '^0.0.3': '>=0.0.3',
            '^1.2.3-beta.2': '>=1.2.3-beta.2',
            '^1.2.x': '>=1.2.0',
            '^0.0.x': '>=0.0.0',
            '^0.0': '>=0.0.0',
            '^1.x': '>=1.0.0',
            '^0.x': '>=0.0.0',
            '~>2.2': '>=2.2.0',
            '~>2.2.0': '>=2.2.0'
        };

        Object.keys(ranges).forEach(function(range) {
            it('should exist on range ' + range, function() {
                var lower = new SemverConstraint(range).lower();

                expect(lower ? lower.toString() : lower).toEqual(ranges[range]);
            });
        });
    });

    describe('upper bound', function() {
        it('should not exist on version constraint', function() {
            expect(new SemverConstraint('1.0.0').upper()).toEqual(undefined);
        });

        var ranges = {
            '1.2.3 - 2.3.4': '<=2.3.4',
            '1.2 - 2.3.4': '<=2.3.4',
            '1.2.3 - 2.3': '<2.4.0',
            '1.2.3 - 2': '<3.0.0',
            '*': undefined,
            '1.*': '<2.0.0',
            '1.2.*': '<1.3.0',
            'x': undefined,
            '1.x': '<2.0.0',
            '1.2.x': '<1.3.0',
            '1': '<2.0.0',
            '1.2': '<1.3.0',
            '~1.2.3': '<1.3.0',
            '~1.2': '<1.3.0',
            '~1': '<2.0.0',
            '~0.2.3': '<0.3.0',
            '~0.2': '<0.3.0',
            '~0': '<1.0.0',
            '~1.2.3-beta.2': '<1.3.0',
            '^1.2.3': '<2.0.0',
            '^0.2.3': '<0.3.0',
            '^0.0.3': '<0.0.4',
            '^1.2.3-beta.2': '<2.0.0',
            '^1.2.x': '<2.0.0',
            '^0.0.x': '<0.1.0',
            '^0.0': '<0.1.0',
            '^1.x': '<2.0.0',
            '^0.x': '<1.0.0',
            '~>2.2': '<3.0.0',
            '~>2.2.0': '<2.3.0'
        };

        Object.keys(ranges).forEach(function(range) {
            it('should exist on range ' + range, function() {
                var upper = new SemverConstraint(range).upper();

                expect(upper ? upper.toString() : upper).toEqual(ranges[range]);
            });
        });
    });

    describe('satisifes', function() {
        var ranges = {
            '1.2.3': ['1.2.3'],
            '1.2.3 - 2.3.4': ['1.2.3', '2.0.0', '2.3.4'],
            '1.2 - 2.3.4': ['1.2.3', '2.0.0', '2.3.4'],
            '1.2.3 - 2.3': ['1.2.3', '2.0.0', '2.3.4'],
            '1.2.3 - 2': ['1.2.3', '2.0.0', '2.3.4'],
            '*': ['0.0.1', '1.2.3', '2.3.4', '42.13.37'],
            'x': ['0.0.1', '1.2.3', '2.3.4', '42.13.37'],
            '1.*': ['1.0.0', '1.0.1', '1.1.0', '1.2.3'],
            '1.x': ['1.0.0', '1.0.1', '1.1.0', '1.2.3'],
            '1.2.*': ['1.2.0', '1.2.1'],
            '1.2.x': ['1.2.0', '1.2.1'],
            '1': ['1.0.0', '1.0.1', '1.1.0', '1.2.3'],
            '1.2': ['1.2.0', '1.2.3'],
            '~1.2.3': ['1.2.3', '1.2.42'],
            '~1.2': ['1.2.0', '1.2.3', '1.2.42'],
            '~1': ['1.0.0', '1.0.1', '1.1.0', '1.2.3'],
            '~0.2.3': ['0.2.3', '0.2.42'],
            '~0.2': ['0.2.3', '0.2.42'],
            '~0': ['0.0.1', '0.2.3'],
            '~1.2.3-beta.2': ['1.2.3', '1.2.42', /*'1.2.5-beta.0'*/],
            '^1.2.3': ['1.2.3', '1.2.42'],
            '^0.2.3': ['0.2.3', '0.2.42'],
            '~>0.17': ['0.22.0']
        };

        Object.keys(ranges).forEach(function(range) {
            ranges[range].forEach(function(version) {
                it(version + ' should satisfy range ' + range, function() {
                    var constraint = new SemverConstraint(range);

                    expect(constraint.satisfies(version)).toBe(true);
                });
            });
        });
    });
});
