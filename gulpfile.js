const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const del = require("del");

// Styles
const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Html
const html = () => {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
}

exports.html = html;

// JS
const js = (done) => {
  gulp.src([
      "source/js/**"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"))
  done();
}

exports.js = js;

// Images
const images = () => {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
}

exports.images = images;

// WebP
const createWebp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(webp({
      quality: 90
    }))
    .pipe(gulp.dest("build/img"))
}

exports.createWebp = createWebp;

// Sprite
const sprite = () => {
  return gulp.src("source/img/icons/*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
}

exports.sprite = sprite;

// Copy
const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/*.ico",
    "source/*.php",
    "source/img/**/*.{jpg,png,svg}",
    "source/css/normalize.css",
    "source/js/**",
    "source/video/**",
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"))
  done();
}

exports.copy = copy;

// Clean
const clean = () => {
  return del("build");
};


// Server
const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Reload
const reload = done => {
  sync.reload();
  done();
}

const watcher = () => {
  gulp.watch(["source/less/**/*.less", "source/*.html", "source/js/**"], gulp.series("styles", "html", "js", reload));
}

// Build
const build = gulp.series(
  clean,
  gulp.parallel(
    styles,
    html,
    sprite,
    copy,
    images,
    createWebp
  )
);

exports.build = build;

// Default
exports.default = gulp.series(
  clean,
  gulp.parallel(
    styles,
    html,
    sprite,
    copy,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  ));
