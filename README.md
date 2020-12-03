# Online SemVer Checker

[![Build Status](https://travis-ci.org/jubianchi/semver-check.svg?branch=master)](https://travis-ci.org/jubianchi/semver-check)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A basic web app coded with ReactJS to check a version against a SemVer constraint.

Check it online here: [http://jubianchi.github.io/semver-check](http://jubianchi.github.io/semver-check)

## SemVer checker... Why?

> In the world of software management there exists a dread place called "dependency hell."

> The bigger your system grows and the more packages you integrate into your software, the more likely you are to find yourself, one day, in this pit of despair.

More and more projects try to follow [Semantic Versioning](http://semver.org/) to reduce package versioning nightmare and every dependency manager implement its own semantic versioner.
Composer and NPM for example don't handle version constraints the same way. It's hard sometimes to be sure how some library version will behave against some constraint.

This tiny webapp checks if a given version satisfies another given constraint in the NPM world.

## Run it!

```
yarn start
```

This will start the build and open your web browser.
