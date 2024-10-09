'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const path = require('path');

function defaultTask() {
    return gulp.src('./css/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./css/'));

}

exports.default = defaultTask

exports.watch = function () {
    gulp.watch('css/*.less', defaultTask);
}