var gulp = require('gulp'),
    sourcemaps = require("gulp-sourcemaps"),
    rev = require('gulp-rev'),
    inject = require('gulp-inject'),
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
    return gulp.src('eureka/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail', {'ignoreWarning': true}));
});

gulp.task('compile', ['lint'], function () {
    var target = gulp.src('./index.html');
    var sources = gulp.src(['eureka/**/module.js', 'eureka/**/*.js', '!eureka/**/*-spec.js'])
	.pipe(sourcemaps.init())
	.pipe(addStream.obj(gulp.src('eureka/**/*.html')
			    .pipe(templateCache('templates.js', {module: 'eureka', root: 'eureka/'}))))
	.pipe(babel({presets: ['es2015']}))
	.pipe(concat('app.js'))
	.pipe(rev())
	.pipe(uglify())
	.pipe(sourcemaps.write('.'))
        .pipe(addStream.obj(gulp.src('assets/**/*', { "base" : "." })))
	.pipe(addStream.obj(gulp.src('config.json')))
	.pipe(gulp.dest('target'));
    
    return target.pipe(inject(sources,{ignorePath: '/target/', relative: true}))
        .pipe(gulp.dest('./target'));
});

gulp.task('test', ['compile'], function (done) {
    return new Server({
	configFile: __dirname + '/karma.conf.js',
	singleRun: true
    }, done).start();
});

gulp.task('ngdocs', function () {
    var options = {
	title: 'Eureka! Clinical Analytics Web Client Documentation',
	html5Mode: false
    };
    return gulp.src(['eureka/**/module.js', 'eureka/**/*.js', '!eureka/**/*-spec.js'])
	.pipe(gulpDocs.process(options))
	.pipe(gulp.dest('./ng-docs'));
});

gulp.task('webserver', function () {
    gulp.src('target')
	.pipe(webserver({
	    open: true,
	    https: {
		key: 'pki/key.pem',
		cert: 'pki/cert.pem'
	    },
	    middleware: [
		proxy('/eureka-webapp', {
		    target: 'https://localhost:8443',
		    secure: false
		}),
		proxy('/eureka-services', {
		    target: 'https://localhost:8443',
		    secure: false
		}),
		proxy('/eureka-protempa-etl', {
		    target: 'https://localhost:8443',
		    secure: false
		}),
		proxy('/cas-server', {
		    target: 'https://localhost:8443',
		    secure: false
		}),
		proxy('/eurekaclinical-user-webapp', {
		    target: 'https://localhost:8443',
		    secure: false
		}),
		proxy('/eurekaclinical-user-service', {
		    target: 'https://localhost:8443',
		    secure: false
		})
	    ]
	}));
});

gulp.task('default', ['ngdocs', 'test']);
