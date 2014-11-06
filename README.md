# Online SemVer Checker [![Build Status](https://travis-ci.org/jubianchi/semver-check.svg?branch=master)](https://travis-ci.org/jubianchi/semver-check) [![Analytics](https://ga-beacon.appspot.com/UA-56445984-1/jubianchi/semver-check)](https://github.com/igrigorik/ga-beacon)

A basic web app coded with ReactJS to check a version against a SemVer constraint.

Check it online here: [http://jubianchi.github.io/semver-check](http://jubianchi.github.io/semver-check)

## SemVer checker... Why?

    In the world of software management there exists a dread place called "dependency hell."
    The bigger your system grows and the more packages you integrate into your software, the more likely you are to find yourself, one day, in this pit of despair.

More and more projects try to follow [Semantic Versionning](http://semver.org/) to reduce package versionning nightmare and every dependancy manager implement its own semantic versionner.
Composer and NPM for example don't handle version constraints the same way. It's hard sometimes to be sure how some library version will behave againts some constraint.

This tiny webapp checks if a given version satifies another given constraint in the NPM world.

But to be honest, this project is also the opportunity to give a shot to ReactJS and its JSX components!

## Run it!

```
npm install
gulp dev
```

And just open `dist/index.html`
