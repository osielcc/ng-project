var gulp = require("gulp"),
	run = require("run-sequence"),
	mainBowerFiles = require("main-bower-files"),
	gulpFilter = require('gulp-filter'),
	order = require("gulp-order"),
	uglify = require('gulp-uglify'),
	concat = require("gulp-concat"),
	webserver = require("gulp-webserver"),
	pump = require("pump"),
	add = require("gulp-add-src"),
	ngAnnotate = require('gulp-ng-annotate');
var exists = require('path-exists').sync;

gulp.task("default", function () {
	run("bower","scripts","styles","sourceToApp","webserver");
})

gulp.task("bower", function () {
	var bowerWithMin = mainBowerFiles().map( function(path, index, arr) {
		var newPath = path.replace(/.([^.]+)$/g, '.min.$1');
		return exists( newPath ) ? newPath : path;
	});
	var filterJS = gulpFilter('**/*.js');
	gulp.src(bowerWithMin)
		.pipe(filterJS)
		.pipe(add.append("bower/moment/locale/es.js"))
		//.pipe(order([]))
		.pipe(concat('vendor.js'))
		//.pipe(uglify())
		.pipe(gulp.dest('./app/js'));

	var filterCSS = gulpFilter('**/*.css');
	gulp.src(mainBowerFiles())
		.pipe(filterCSS)
		.pipe(concat("bundle.css"))
		//.pipe(minifyCSS())
		.pipe(gulp.dest('./app/css'));

	var filterPNG = gulpFilter('**/*.png');
	gulp.src(mainBowerFiles())
		.pipe(filterPNG)
		.pipe(gulp.dest('./app/images'));
});

gulp.task("sourceToApp",function(){
	gulp.src(["./source/**/*.html"]).pipe(gulp.dest("./app"));
});

gulp.task("webserver", function () {
	gulp.src('app')
		.pipe(webserver({
			livereload: true,
			directoryListing: 'index.html',
			open: false
		}));
});

gulp.task("scripts",function(cb){
	pump([
		gulp.src(["source/js/app.js","source/**/*.js"]),
		concat('app.js'),
		ngAnnotate(),
		//uglify(),
		gulp.dest("app/js")
	],cb);
});

gulp.watch("source/**/*.html",function(){
	run("sourceToApp");
});

gulp.watch("source/**/*.js",function(){
	run("scripts");
});

gulp.task("styles",function(){
	gulp.src(["source/css/**/*.css"])
		.pipe(gulp.dest("app/css"));
});

gulp.watch("source/**/*.css",function(){
	run("styles");
});