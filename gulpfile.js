var gulp = require("gulp"),
	  minifyJS = require('gulp-uglify'),
    rename = require("gulp-rename"),
    plumber = require('gulp-plumber');

const babel = require('gulp-babel');


/*
npm install gulp --save-dev 
npm i gulp-rename --save-dev 
npm install --save-dev gulp-uglify
npm install --save-dev gulp-plumber
# Babel 7
npm install --save-dev gulp-babel@next @babel/core
npm install --save-dev @babel/preset-env
npm install --save-dev @babel/plugin-proposal-class-properties
*/

/*
 gulp build
*/
gulp.task("build", function () {

  return gulp.src("index.js")
      .pipe(plumber())  
      .pipe(babel({
          presets: ['@babel/env'],
          plugins: ["@babel/plugin-proposal-class-properties"]
      })) 
      .pipe(minifyJS())
      .pipe(rename("index.min.js"))
      .pipe(gulp.dest("./."));
});





                            