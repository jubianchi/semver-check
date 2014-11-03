var browserify = require('browserify'),
    gulp = require('gulp'),
    source = require("vinyl-source-stream"),
    reactify = require('reactify');


var paths = {
    layout: ['./src/index.html'],
    js: './src/main.js'
};

gulp.task('browserify-reactify', function() {
    var b = browserify();
    b.transform(reactify);
    b.add(paths.js);

    return b.bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./build/js'));
});

gulp.task('assets', function() {
    gulp.src('src/index.html')
        .pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {
    gulp.watch(paths.layout, ['assets']);
    gulp.watch(paths.js, ['browserify-reactify']);
});

gulp.task('default', ['watch', 'assets', 'browserify-reactify']);
