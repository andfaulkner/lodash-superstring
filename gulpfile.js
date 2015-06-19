var gulp = require("gulp");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");

gulp.task("minify", function(){
    return gulp.src("lodash-superstring.js")
        .pipe(uglify())
        .pipe(rename("lodash-superstring.min.js"))
        .pipe(gulp.dest("./"));
});