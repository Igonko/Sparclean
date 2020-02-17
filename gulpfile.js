const gulp = require('gulp');
const sass = require('gulp-sass');
const buble = require('gulp-buble');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();

const sassFiles = [
    './src/sass/main.sass',
    './src/sass/media.sass'
];
const libsFiles = [
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/slick-carousel/slick/slick.min.js'
]

gulp.task('sass-compile', () => {
    return gulp.src(sassFiles)
    .pipe(sourcemaps.init('./build/css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            overrideBrowserslist:  ['last 2 versions'],
            cascade: false
        }))
    .pipe(concat('style.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream())
});

gulp.task('js-compile', () => {
    return gulp.src('./src/js/main.js')
    .pipe(sourcemaps.init('./build/js'))
    .pipe(buble())
    .pipe(concat('script.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream())
});

gulp.task('libs', () => {
    return gulp.src(libsFiles)
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('./build/libs/js'))
});

gulp.task('slick-css', () => {
    return gulp.src(['./node_modules/slick-carousel/slick/slick.css', './node_modules/slick-carousel/slick/slick-theme.css'])
    .pipe(concat('slick.css'))
    .pipe(gulp.dest('./build/libs/css'))
});
gulp.task('slick-fonts', () => {
    return gulp.src('./node_modules/slick-carousel/slick/fonts/**.*')
    .pipe(gulp.dest('./build/libs/css/fonts'))
});
gulp.task('slick-gif', () => {
    return gulp.src('./node_modules/slick-carousel/slick/**.gif')
    .pipe(gulp.dest('./build/libs/css/'))
});

gulp.task('clean', () => {
    return del(['build/css/style.css','build/js'])
})

gulp.task('watch', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./src/sass/**/*.sass', gulp.series('sass-compile'));
    gulp.watch('./src/js/**/*.js', gulp.series('js-compile'));
    gulp.watch('./*.html').on('change', browserSync.reload);
})

gulp.task('build', gulp.series('clean', gulp.parallel('sass-compile', 'js-compile', 'libs', 'slick-css', 'slick-fonts', 'slick-gif')))
gulp.task('dev', gulp.series('build', 'watch'))
