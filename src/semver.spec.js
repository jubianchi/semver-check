import React from 'react';
import semver from './semver';

describe('semver', () => {
    describe('clean range', () => {
        it('should remove trailing/leading spaces', () => {
            expect(semver.cleanRange('   1.0.0\t')).toBe('1.0.0');
            expect(semver.cleanRange('   ^1.0.0\t')).toBe('^1.0.0');
            expect(semver.cleanRange('\t~1.0.0\t')).toBe('~1.0.0');
        });

        it('should remove the v prefix in front of each version number', () => {
            const data = {
                'v1.0.0': '1.0.0',
                '=v1.0.0': '1.0.0',
                '^v1.0.0': '^1.0.0',
                '~v1.0.0': '~1.0.0',
                '~>v1.0.0': '~>1.0.0',
                '>v1.0.0': '>1.0.0',
                '>=v1.0.0': '>=1.0.0',
                '<v1.0.0': '<1.0.0',
                '<=v1.0.0': '<=1.0.0',
                'v1.0.0 - v2.0.0': '1.0.0 - 2.0.0',
                'v1.0.0 <=v1.2.0': '1.0.0 <=1.2.0',
                'v1.0.0 || v1.2.0': '1.0.0 || 1.2.0',
            };

            Object.keys(data).forEach(dirty => {
                expect(semver.cleanRange(dirty)).toBe(data[dirty]);
            });
        });

        it('should remove the = prefix', () => {
            const data = {
                '=1.0.0': '1.0.0',
                '>=1.0.0': '>=1.0.0',
                '<=1.0.0': '<=1.0.0',
                '=1.0.0 || =1.2.0': '1.0.0 || 1.2.0',
            };

            Object.keys(data).forEach(dirty => {
                expect(semver.cleanRange(dirty)).toBe(data[dirty]);
            });
        });
    });

    describe('coerceRange', () => {
        describe('should return null if range is falsy', () => {
            it('no range', () => {
                expect(semver.coerceRange()).toBe(null);
            });

            it('empty range', () => {
                expect(semver.coerceRange('')).toBe(null);
            });

            it('range is undefined', () => {
                expect(semver.coerceRange(undefined)).toBe(null);
            });

            it('range is null', () => {
                expect(semver.coerceRange(null)).toBe(null);
            });

            it('range is false', () => {
                expect(semver.coerceRange(null)).toBe(null);
            });
        });

        describe('should coerce integer ranges', () => {
            it('should not return null if range is 0', () => {
                expect(semver.coerceRange(0)).not.toBe(null);
            });

            it('should coerce range 0 as a range constraint', () => {
                expect(semver.coerceRange(0)).toHaveProperty('range', true);
            });
        });

        describe('types', () => {
            const rangeAndType = {
                '>=8.10.0': 'range',
                '>=8.11.0': 'range',
            };

            Object.keys(rangeAndType).forEach(range => {
                it(`should compute type for ${range}`, () => {
                    expect(semver.coerceRange(range)[rangeAndType[range]]).toBe(true);
                });
            });
        });

        describe('operators', () => {
            const rangeAndOperator = {
                '1.0.0': '=',
                '^1.0.0': '^',
                '~1.0.0': '~',
                '~>1.0.0': '~>',
            };

            Object.keys(rangeAndOperator).forEach(range => {
                it(`should compute operator for ${range}`, () => {
                    expect(semver.coerceRange(range).operator).toBe(rangeAndOperator[range]);
                });
            });
        });

        describe('constraint parts', () => {
            const rangeAndParts = {
                '1.0.0': { major: '1', minor: '0', patch: '0' },
                '^1.0.0': { major: '1', minor: '0', patch: '0' },
                '~1.0.0': { major: '1', minor: '0', patch: '0' },
                '~>1.0.0': { major: '1', minor: '0', patch: '0' },
            };

            Object.keys(rangeAndParts).forEach(range => {
                it(`should compute constraint parts for ${range}`, () => {
                    expect(semver.coerceRange(range)).toMatchObject(rangeAndParts[range]);
                });
            });
        });

        describe('satisifes', function () {
            const ranges = {
                '1.2.3': ['1.2.3'],
                '1.2.3 - 2.3.4': ['1.2.3', '2.0.0', '2.3.4'],
                '1.2 - 2.3.4': ['1.2.3', '2.0.0', '2.3.4'],
                '1.2.3 - 2.3': ['1.2.3', '2.0.0', '2.3.4'],
                '1.2.3 - 2': ['1.2.3', '2.0.0', '2.3.4'],
                '*': ['0.0.1', '1.2.3', '2.3.4', '42.13.37'],
                x: ['0.0.1', '1.2.3', '2.3.4', '42.13.37'],
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
                '~1.2.3-beta.2': ['1.2.3', '1.2.42', '1.2.5-beta.0'],
                '^1.2.3': ['1.2.3', '1.2.42'],
                '^0.2.3': ['0.2.3', '0.2.42'],
                '~>0.17': ['0.22.0'],
                '>=1.12.14 <1.15.0': ['1.12.14', '1.14.0'],
                '>=1.0.0': ['1.1.0-snapshot.1'],
            };

            Object.keys(ranges).forEach(range => {
                ranges[range].forEach(version => {
                    it(version + ' should satisfy range ' + range, () => {
                        const constraint = semver.coerceRange(range);

                        expect(semver.satisfies(semver.coerce(version), constraint)).toBe(true);
                    });
                });
            });
        });

        describe('does not satisfy', function () {
            const ranges = {
                '1.2.3': ['0.0.1', '1.2.5', '2.0.0'],
                '1.2.3 - 2.3.4': ['0.0.1', '1.0.0', '2.5.0', '3.0.0'],
                '1.2 - 2.3.4': ['0.0.1', '1.0.0', '2.5.0', '3.0.0'],
                '1.2.3 - 2.3': ['0.0.1', '1.0.0', '2.5.0', '3.0.0'],
                '1.2.3 - 2': ['0.0.1', '1.0.0', '3.0.0'],
                '1.*': ['0.0.1', '2.0.0'],
                '1.x': ['0.0.1', '2.0.0'],
                '1.2.*': ['1.0.0', '1.3.1', '2.0.0'],
                '1.2.x': ['1.0.0', '1.3.1', '2.0.0'],
                '1': ['0.0.1', '2.0.0'],
                '1.2': ['1.0.0', '1.3.1', '2.0.0'],
                '~1.2.3': ['1.0.0', '2.0.0'],
                '~1.2': ['1.0.0', '2.0.0'],
                '~1': ['0.0.1', '2.0.0'],
                '~0.2.3': ['0.0.1', '1.0.0', '2.0.0'],
                '~0.2': ['0.0.1', '1.0.0', '2.0.0'],
                '~0': ['1.0.0'],
                '>=1.12.14 <1.15.0': ['1.15.0', '99.99.99'],
                '>=1.0': ['0.0.1'],
                '>1.0': ['0.0.1'],
                '>=2.0.0-alpha.1 <=2.0.0-alpha.7': ['2.0.0-alpha.10'],
            };

            Object.keys(ranges).forEach(range => {
                ranges[range].forEach(version => {
                    it(version + ' should not satisfy range ' + range, () => {
                        const constraint = semver.coerceRange(range);

                        expect(semver.satisfies(semver.coerce(version), constraint)).toBe(false);
                    });
                });
            });
        });
    });
});
