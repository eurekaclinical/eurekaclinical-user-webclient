var gulp = require('gulp'),
    sourcemaps = require("gulp-sourcemaps"),
    rev = require('gulp-rev'),//append random number
    inject = require('gulp-inject'),//inject js and css file into index.html
    babel = require("gulp-babel"),
    concat = require("gulp-concat"),
    gulpDocs = require('gulp-ngdocs'),
    uglify = require('gulp-uglify'),
    templateCache = require('gulp-angular-templatecache'),
    addStream = require('add-stream'),
    Server = require('karma').Server,
    jshint = require('gulp-jshint'),
    webserver = require('gulp-webserver'),
    proxy = require('http-proxy-middleware');

gulp.task('lint', function() {
    return gulp.src('dist/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail', {'ignoreWarning': true}));
});

gulp.task('compile', ['lint'], function () {
    var target = gulp.src('./index.html');
    var sources = gulp.src(['dist/**/*.js'])
	.pipe(sourcemaps.init())
        .pipe(templateCache('templates.js', {module: 'eureka', root: 'eureka/'}))))
	.pipe(babel({presets: ['es2015']}))
	.pipe(concat('app.js'))
	.pipe(rev())
	.pipe(uglify())
	.pipe(sourcemaps.write('.'))
        .pipe(addStream.obj(gulp.src('assets/**/*', { "base" : "." })))
	.pipe(gulp.dest('target'));
    
    return target.pipe(inject(sources,{ignorePath: '/target/', relative: true}))
        .pipe(gulp.dest('./target'));
});

gulp.task('default', ['compile']);
