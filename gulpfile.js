const gulp = require('gulp'),
      sass = require('gulp-sass'),
      watch = require('gulp-watch'),
      webp = require('gulp-webp'),
      cleanCSS = require('gulp-clean-css'),
      rename = require('gulp-rename'),
      sourcemaps = require('gulp-sourcemaps'),
      imagemin = require('gulp-imagemin');

const path ='wildlife/',
      path_assets = path + 'assets/';

/**
 * ----------------------------------------------------------------------------
 *  COPY
 * ----------------------------------------------------------------------------
 */

gulp.task('copy', () => {

  // Flickity carousel

  gulp.src('node_modules/flickity/dist/flickity.pkgd.min.js')
  .pipe(gulp.dest(path_assets + 'js'));
  
  gulp.src('node_modules/flickity/dist/flickity.min.css')
  .pipe(gulp.dest(path_assets + 'css'));

  // Lazysizes

  return gulp.src('node_modules/lazysizes/lazysizes.min.js')
    .pipe(gulp.dest(path_assets + 'js'));
});

/**
 * ----------------------------------------------------------------------------
 *  SASS AND CSS
 * ----------------------------------------------------------------------------
 */

/* Compile Sass file
 * Determines the output format of the final CSS style - { outputStyle: 'expanded' }
 ================================================================================ */

gulp.task('sass', () => {
  return gulp.src(path_assets + 'scss/style.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest(path));
});

/* WATCH ================================================================================ */

gulp.task('watch', () => {
  return gulp.watch(path_assets + 'scss/**/*.scss', gulp.series(['sass']));
});

/* Minify CSS
 * Rename file
 * Generate Source Maps
 ================================================================================ */

gulp.task('minify-css', () => {
  return gulp.src(path_assets + 'css/style.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path_assets + 'css'));
});

/**
 * ----------------------------------------------------------------------------
 *  IMAGES
 * ----------------------------------------------------------------------------
 */

/* MINIFY ================================================================================ */

gulp.task('image', () => {
  return gulp.src(path_assets + 'images/original/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest(path_assets + 'images'));
});

/* CONVERT TO WEBP ================================================================================ */

gulp.task('webp', () => {
  return  gulp.src(path_assets + 'images/original/**/*.{jpg,png}')
    .pipe(webp())
    .pipe(gulp.dest(path_assets + 'images'));
});
