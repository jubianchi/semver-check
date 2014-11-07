var browserify = require('browserify'),
    gulp = require('gulp'),
    less = require('gulp-less'),
    prefix = require('gulp-autoprefixer'),
    ga = require('gulp-ga'),
    jest = require('gulp-jest'),
    source = require("vinyl-source-stream"),
    reactify = require('reactify');


var paths = {
    layout: ['./src/index.html'],
    less: ['./src/less/**/*.less'],
    images: ['./src/images/**/*.*'],
    js: ['./src/main.js', './src/components/*.jsx', './src/libs/*.js']
};

gulp.task('browserify-reactify', function() {
    var b = browserify();
    b.transform(reactify);
    b.add('./src/main.js');

    return b.bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./build/js'));
});

gulp.task('html', function() {
    gulp.src(paths.layout)
        .pipe(gulp.dest('./build'));
});

gulp.task('html:prod', function() {
    gulp.src(paths.layout)
        .pipe(ga({
            url: 'jubianchi.github.io',
            uid: 'UA-56445984-1'
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('assets', function() {
    gulp.src(paths.less)
        .pipe(less())
        .pipe(prefix({
            cascade: true,
            browser: ['last 5 versions']
        }))
        .pipe(gulp.dest('./build'));

    gulp.src(paths.images)
        .pipe(gulp.dest('./build/images'));
});

gulp.task('watch', function() {
    gulp.watch(paths.layout, ['html']);
    gulp.watch(paths.less, ['assets']);
    gulp.watch(paths.images, ['assets']);
    gulp.watch(paths.js, ['browserify-reactify']);
});

gulp.task('test', function() {
    gulp.src('.')
        .pipe(jest({
            scriptPreprocessor: 'preprocessor.js',
            unmockedModulePathPatterns: [
                './node_modules/react',
                './node_modules/semver'
            ],
            moduleFileExtensions: [
                "js"
            ],
            testDirectoryName: "tests"
        }));
});

gulp.task('prod', ['html:prod', 'assets', 'browserify-reactify']);
gulp.task('dev', ['html', 'watch', 'prod']);
gulp.task('default', ['prod']);



