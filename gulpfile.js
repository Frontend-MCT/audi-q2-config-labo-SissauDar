// yarn init
// yarn add gulp
// yarn add gulp-htmlmin
// gulp minifyHTML
// yarn add browser-sync
// gulp watchFiles or serve

// yarn add yarn-loader
// yarn add gulp-plumer
// yarn add webpack
// yarn add webpack-stream
// yarn add gulp-eslint
// yarn add babel-loader
// yarn add @babel/core
// yarn add gulp-concat
// yarn add sass
// yarn add gulp-sass
// yarn add gulp-rename
// yarn add gulp-postcss
// yarn add autoprefixer
// yarn add cssnano
// yarn add gulp-uglify
// gulp serve

// #1 IMPORT van toegevoegde packages (via npm of yarn).

// Basic packages
const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const plumber = require('gulp-plumber');

// HTML packages
const htmlmin = require('gulp-htmlmin');

// CSS packages
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// JS packages
// const webpack = require('webpack');
// const webpackconfig = require('./webpack.config.js');
// const webpackstream = require('webpack-stream');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');



// Ook nog:
// babel-loader
// @babel/core


// #2 De TASKS / WATCHERS  zelf die we aanmaken.
// a: We willen een development server opzetten
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: './dist/'
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// b: Html moet geminified naar de dist-map gezet worden.
function minifyHTML() {
  return gulp
    .src('./src/pages/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('./dist/'));
}

// c: JS willen we samenvoegen, minifien en compatibel maken.
function scriptsLint() {
  return gulp.src(['./src/script/**/*', './gulpfile.js'])
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

// Transpile, concatenate and minfy scripts.
function scripts() {
  return gulp
    .src(['./src/script/lib/*js', './src/script/*js'])
    .pipe(plumber())
    .pipe(concat('app.bundle.js'))
    .pipe(gulp.dest('./dist/script/'))
    .pipe(browsersync.stream());
}

// CSS enkel screen.scss omzetten bij een verandering.
function style() {
  return gulp
    .src('./src/style/screen.scss')
    .pipe(sass())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .on('error', sass.logError)
    .pipe(gulp.dest('./dist/style/'));
}


// d: Watchen van veranderingen.
const serve = gulp.parallel(watchFiles, browserSync); // Complexere combinatie van tasks.

function watchFiles() {
  gulp.watch(['./src/script/**/*.js'], gulp.series(scripts, browserSyncReload));
  gulp.watch(['./src/**/*.html'], gulp.series(minifyHTML, browserSyncReload));
  gulp.watch('./src/style/**/*.scss', gulp.series(style, browserSyncReload));
}

// #3 Export van onze eigen tasks (functions).
exports.serve = serve;