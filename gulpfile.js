var gulp = require("gulp");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var wrapUMD = require("gulp-wrap-umd");

gulp.task("minify", function(){
    return gulp.src("lodash-superstring.js")
        .pipe(uglify())
        .pipe(rename("lodash-superstring.min.js"))
        .pipe(gulp.dest("./"));
});

gulp.task("umd", function(){
	gulp.src(['lodash-superstring.js'])
		.pipe(wrapUMD({
			namespace: '_',
			deps: [
				{ name: 'lodash', globalName: '_', amdName: '../lodash' }
			]
		}))
		.pipe(gulp.dest('dest/'));
});