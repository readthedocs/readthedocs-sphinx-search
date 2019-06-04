"use strict";

var autoprefixer = require("gulp-autoprefixer");
var csso = require("gulp-csso");
var del = require("del");
var gulp = require("gulp");
var rename = require("gulp-rename");
var runSequence = require("run-sequence");
var uglify = require("gulp-uglify");
var babel = require("gulp-babel");

gulp.task("styles", function() {
  return gulp
    .src("sphinx_es_suggest/_static/css/*.css")
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(rename({ extname: ".min.css" }))
    .pipe(gulp.dest("sphinx_es_suggest/_static/css"));
});

gulp.task("scripts", function() {
  return gulp
    .src("sphinx_es_suggest/_static/js/*.js")
    .pipe(babel({ presets: ["@babel/env"] }))
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(gulp.dest("sphinx_es_suggest/_static/js"));
});

gulp.task("clean", function() {
  return del(["sphinx_es_suggest/**/*.min.*"]);
});

gulp.task("default", ["clean"], function() {
  runSequence("styles", "scripts");
});
