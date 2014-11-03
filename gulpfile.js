var browserify = require('browserify'),
    gulp = require('gulp'),
    less = require('gulp-less'),
    prefix = require('gulp-autoprefixer'),
    source = require("vinyl-source-stream"),
    reactify = require('reactify');


var paths = {
    layout: ['./src/index.html'],
    less: ['./src/less/**/*.less'],
    images: ['./src/images/**/*.*'],
    js: ['./src/main.js', './src/components/*.jsx']
};

gulp.task('browserify-reactify', function() {
    var b = browserify();
    b.transform(reactify);
    b.add('./src/main.js');

    return b.bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./build/js'));
});

gulp.task('assets', function() {
    gulp.src(paths.layout)
        .pipe(gulp.dest('./build'));

    gulp.src(paths.less)
        .pipe(less())
        .pipe(prefix({ cascade: true }))
        .pipe(gulp.dest('./build'));

    gulp.src(paths.images)
        .pipe(gulp.dest('./build/images'));
});

gulp.task('watch', function() {
    gulp.watch(paths.layout, ['assets']);
    gulp.watch(paths.less, ['assets']);
    gulp.watch(paths.images, ['assets']);
    gulp.watch(paths.js, ['browserify-reactify']);
});

gulp.task('prod', ['assets', 'browserify-reactify']);
gulp.task('dev', ['watch', 'prod']);
gulp.task('default', ['prod']);

