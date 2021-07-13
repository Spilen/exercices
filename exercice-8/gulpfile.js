'use strict';

var gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),    // AutoPrefixe Crossbrowser
    del          = require('del'),                  // Suppression de fichiers
    imagemin     = require('gulp-imagemin'),        // Optimisation des images
    minifyCss    = require('gulp-minify-css'),      // CSS min
    plumber      = require('gulp-plumber'),         // Empêche le process d'être killer malgré une erreur
    rename       = require('gulp-rename'),          // Renommage
    sass         = require('gulp-sass'),            // SCSS > CSS
    svgSprite    = require('gulp-svg-sprites');     // Sprite SVG


// -----------------------------------------------------------------------------
// Variables
// -----------------------------------------------------------------------------

// Arborescence
var SASS_FILES_PATH = './src/scss/**/*.scss';                   // Répertoire des sources SCSS
var CSS_FILES_DIR   = './dist/css/';                                 // Répertoire des livrables CSS
var IMG_FILES_PATH  = './src/img/**/*.{png,jpg,jpeg,gif,svg}';  // Répertoire des sources IMG
var IMG_FILES_DIR   = './dist/img/';                                  // Répertoire des livrables IMG

// Options
var autoprefixerOptions = {
    browsers: ['last 2 versions', 'Explorer >= 11', 'Chrome >= 49', 'Safari >= 8', 'iOS >= 7', 'Android >= 4.0']
};


// -----------------------------------------------------------------------------
// Tâches
// -----------------------------------------------------------------------------

// SCSS TASK
gulp.task('css', function(){
    return gulp.src(SASS_FILES_PATH)
        .pipe(plumber())
        //.pipe(sourcemaps.init())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(sass().on('error', sass.logError))                             // Compile les fichiers SCSS > CSS
        .pipe(minifyCss())                        // Minifie les fichiers CSS
        //.pipe(sourcemaps.write('.'))              // Ecriture du SourceMap
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(CSS_FILES_DIR))           // Save + Move
});

// JS TASK
// gulp.task('js', function(){
//     return gulp.src(JS_FILES_PATH)
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(gulp.dest(JS_FILES_DIR))           // Save + Move
// });

// IMG TASK
gulp.task('opti', function () {
    return gulp.src(IMG_FILES_PATH)
        .pipe(imagemin())
        .pipe(gulp.dest(IMG_FILES_DIR));
});

// SVG TASK
gulp.task('sprites', function () {
    return gulp.src('./src/img/icons/*.svg')
        .pipe(svgSprite({mode: "symbols"}))
        .pipe(gulp.dest(IMG_FILES_DIR))
    del([IMG_FILES_DIR + '/icons/'], cb)
});

// -----------------------------------------------------------------------------
// Final
// -----------------------------------------------------------------------------

// WATCH TASK
gulp.task('watch', function(){
    gulp.watch(SASS_FILES_PATH, ['css']);
    gulp.watch(CSS_FILES_DIR + '/dist/css/**/*.css', ['css']);
});

// BUILD TASK
gulp.task('build', ['css','sprites','watch','opti'], function (){
    console.log('Building files');
});