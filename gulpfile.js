var gulp = require('gulp'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    stringify = require('stringify'),
    source = require('vinyl-source-stream'),
    markdown = require('gulp-markdown'),
    concat = require('gulp-concat'),
    wrap = require('gulp-wrap'),
    gutil = require('gulp-util'),
    stylus = require('gulp-stylus'),
    minifyify = require('minifyify')

// CONFIGURATION
var scripts = {
    entry: './src/main.js',
    outputFile: 'main.js',
    outputDir: './public/dist/js'
}

gulp.task('build-styles', function () {
    return gulp.src(['./src/styles/main.styl'])
        .pipe(stylus())
        .pipe(gulp.dest('./public/dist/css'))
})

gulp.task('watch-styles', ['build-styles'], function () {
    return gulp.watch(['./src/styles/**/*'], ['build-styles'])
})

gulp.task('compile-articles', function () {
    return gulp.src(['./src/articles/**/*.md'])
        .pipe(markdown())
        .pipe(wrap("<template id='<%= setArticleId(file) %>'><%= contents %></template>", {
            setArticleId: function (file) {
                return file.relative.replace(/\.html$/, '').split(/[\/\\]+/).join('-')
            }
        }))
        .pipe(concat('index.html'))
        .pipe(wrap({src: './template.html'}))
        .pipe(gulp.dest('./'))
})

gulp.task('watch-articles', ['compile-articles'], function () {
    return gulp.watch('./src/articles/**/*', ['compile-articles'])
})

gulp.task('build-scripts', function () {
    return browserify(scripts.entry, {debug: true})
        .plugin(minifyify, {output: scripts.outputDir + '/main.js.map'})
        .transform(stringify, {
            appliesTo: { includeExtensions: ['.md', '.html', '.toml', '.json'] }
        })
        .on('log', gutil.log)
        .bundle()
        .on('error', gutil.log)
        .pipe(source(scripts.outputFile))
        .pipe(gulp.dest(scripts.outputDir))
})

gulp.task('watch-scripts', function () {
    var b = browserify([scripts.entry])
        .on('log', gutil.log)
        .plugin([watchify])
        .transform(stringify, {
            appliesTo: { includeExtensions: ['.md', '.html', '.toml', '.json'] }
        })

    var bundle = function () {
        b.bundle()
            .on('error', gutil.log)
            .pipe(source(scripts.outputFile))
            .pipe(gulp.dest(scripts.outputDir))
    }
    b.on('update', bundle)
    bundle()
})

gulp.task('watch', ['watch-articles', 'watch-scripts', 'watch-styles'])
gulp.task('build', ['compile-articles', 'build-scripts', 'build-styles'])
gulp.task('default', ['build'])
