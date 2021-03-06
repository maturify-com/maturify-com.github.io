/**
 * Created by Sergey on 27.04.2016.
 */

/*===========GULP==============*/
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var coffee = require('gulp-coffee');
var nunjucksRender = require('gulp-nunjucks-render');
var minifyjs = require('gulp-uglify');
var concat = require('gulp-concat');
var minify_css = require('gulp-clean-css');
var imagewebp = require('gulp-webp');
var runSequence = require('gulp4-run-sequence');
var browserSync = require('browser-sync').create();

/*===========Compile SCSS==============*/

var sass = require('gulp-sass');
var lec = require('gulp-line-ending-corrector')

gulp.task('sass', (done) => {

    gulp.src('src/sass/base/*.scss').pipe(lec(), { allowEmpty: true })
        .pipe(sass())
        .pipe(gulp.dest('css'));

    gulp.src('src/sass/blocks/*.scss').pipe(lec(), { allowEmpty: true })
        .pipe(sass())
        .pipe(gulp.dest('css'));

    gulp.src('src/sass/layouts/*.scss').pipe(lec(), { allowEmpty: true })
        .pipe(sass())
        .pipe(gulp.dest('css'));

    gulp.src('src/sass/modules/*.scss').pipe(lec(), { allowEmpty: true })
        .pipe(sass())
        .pipe(gulp.dest('css'));

    gulp.src('src/sass/widgets/*.scss').pipe(lec(), { allowEmpty: true })
        .pipe(sass())
        .pipe(gulp.dest('css'))

        .pipe(plumber())
        .pipe(sass({ errLogToConsole: true }))
        .pipe(browserSync.stream());
    done();

});

/* =========Minify JS ========== */

gulp.task('minifyjs', function () {
    return gulp.src(['src/js/jquery-2.1.4.min.js',
        'src/js/crum-mega-menu.js',
        'src/js/swiper.jquery.min.js',
        'src/js/theme-plugins.js',
        'src/js/main.js',
        'src/js/form-actions.js',
        'src/js/velocity.min.js',
        'src/js/ScrollMagic.min.js',
        'src/js/animation.velocity.min.js'
    ], { allowEmpty: true })
        .pipe(uglify())
        .pipe(gulp.dest('src/js/minified'))
});

/* =========Combine JS ========== */

/*Dev Files*/
gulp.task('concat', function () {
    return gulp.src(['src/js/minified/jquery-2.1.4.min.js',
        'src/js/minified/crum-mega-menu.js',
        'src/js/minified/swiper.jquery.min.js',
        'src/js/minified/theme-plugins.js',
        'src/js/minified/main.js',
        'src/js/minified/form-actions.js',
        'src/js/minified/velocity.min.js',
        'src/js/minified/ScrollMagic.min.js',
        'src/js/minified/animation.velocity.min.js'
    ], { allowEmpty: true })
        .pipe(concat('all.js'))
        .pipe(gulp.dest('src/js/combined'))
});

/*Prod Files*/
gulp.task('concat_dist', function () {
    return gulp.src('src/js/combined/**/*', { allowEmpty: true })
        .pipe(gulp.dest('js/combined'))
});


/*===========ON-Line synchronization from browsers==============*/


gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    })
});


/*===========Watch==============*/


gulp.task('watch', gulp.series('browserSync', 'sass', () => {
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/templates/**/*.nunjucks', ['nunjucks']);
    gulp.watch('src/pages/**/*.nunjucks', ['nunjucks']);
    gulp.watch('src/*.html').on('change', browserSync.reload);
    gulp.watch('src/js/**/*.js').on('change', browserSync.reload);

    // others
}));


/*===========Join files==============*/


var useref = require('gulp-useref');

gulp.task('useref', function () {
    var assets = useref.assets();

    return gulp.src('*.html', { allowEmpty: true })
        .pipe(assets)
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'))
});


var uglify = require('gulp-uglify');

gulp.task('useref', function () {
    var assets = useref.assets();

    return gulp.src('*.html', { allowEmpty: true })
        .pipe(assets)
        .pipe(uglify())
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'))
});


/* use this code in the markup HTML!!!!!

 <!--build:js js/main.min.js -->
 <script src="js/lib/a-library.js"></script>
 <script src="js/lib/another-library.js"></script>
 <script src="js/main.js"></script>
 <!-- endbuild -->

 FOR CSS

 <!--build:css css/styles.min.css-->
 <link rel="stylesheet" href="css/styles.css">
 <link rel="stylesheet" href="css/another-stylesheet.css">
 <!--endbuild-->

 */



/*===========Join files for CSS==============*/


var gulpIf = require('gulp-if');

gulp.task('useref', function () {
    var assets = useref.assets();

    return gulp.src('*.html', { allowEmpty: true })
        .pipe(assets)
        .pipe(gulpIf('*.js', uglify()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'))
});

/*===========Minify CSS Dev==============*/

gulp.task('minify_css', function () {
    return gulp.src(['src/css/fonts.css',
        'src/css/crumina-fonts.css',
        'src/css/normalize.css',
        'src/css/grid.css',
        'src/css/base.css',
        'src/css/blocks.css',
        'src/css/layouts.css',
        'src/css/modules.css',
        'src/css/widgets-styles.css',
        'src/css/jquery.mCustomScrollbar.min.css',
        'src/css/swiper.min.css',
        'src/src/css/primary-menu.css',
        'src/css/magnific-popup.css',
        'src/fonts/**/*'
    ], { allowEmpty: true })
        .pipe(gulpIf('*.css', minify_css()))
        .pipe(gulp.dest('src/css/minified/'))
        .pipe(gulpIf('!*.css', gulp.dest('src/css/fonts/')))
})

/*===========Minify CSS Prod ==============*/

/*var minifyCSS = require('gulp-minify-css');

gulp.task('useref', function(){
    var assets = useref.assets();

    return gulp.src('*.html')
        .pipe(assets)
        .pipe(gulpIf('*.css', minifyCSS()))
        // Uglifies only if it's a Javascript file
        .pipe(gulpIf('*.js', uglify()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'))
});*/

gulp.task('minify_css_dist', function () {
    return gulp.src('src/css/minified/**/*', { allowEmpty: true })
        .pipe(gulp.dest('css/minified/'))
})


/*==================Copy minified relevant fonts=========================*/
gulp.task('minify_css_fonts_dist', function () {
    return gulp.src('src/css/fonts/**/*', { allowEmpty: true })
        .pipe(gulp.dest('css/fonts/'))
})


/*===========Minimization IMAGE==============*/


var imagemin = require('gulp-imagemin');

gulp.task('images', function () {
    return gulp.src('src/img/**/*.+(png|jpg|gif|svg)', { allowEmpty: true })
        .pipe(imagemin())
        .pipe(gulp.dest('img'))
});

var cache = require('gulp-cache');

gulp.task('images', function () {
    return gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg)', { allowEmpty: true })
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('img'))
});


gulp.task('compress', function () {
    gulp.src('src/img/*', { allowEmpty: true })
        .pipe(imagemin())
        .pipe(gulp.dest('img'));
});

/*===========Minimization IMAGE to WEBP Format==============*/

// gulp.task('compressingtowebp', function() {
//     gulp.src('src/img/**/*.+(png|jpg|gif|svg)')
//         .pipe(imagewebp())
//         .pipe(gulp.dest('src/img/webp'));
// });

// gulp.task('webpimg_copytodest', function() {
//     gulp.src('src/img/webp/**/*')
//         .pipe(gulp.dest('img/webp'));
// });
/*===========Copy svg images to destination==============*/

gulp.task('svg_copytodest', (done) => {
    gulp.src('src/svg/**/*', { allowEmpty: true })
        .pipe(gulp.dest('svg/'));
    done();
});

/*=============Copy Fonts==============*/

gulp.task('fonts', function () {
    return gulp.src('src/fonts/**/*', { allowEmpty: true })
        .pipe(gulp.dest('fonts'))
})


/*=============Auto-deleting temporary files==============*/

// var del = require('del');

// gulp.task('clean:dist', function(callback){
//     del(['dist/**/*', '!dist/images', '!dist/images/**/*'], callback)
// });


// gulp.task('clean', function(callback) {
//     del('dist');
//     return cache.clearAll(callback);
// })



/*============= nunjucks templates ==============*/

/*============= Dev files ==============*/
gulp.task('nunjucks', function () {
    // Gets .html and .nunjucks files in pages
    return gulp.src('src/**/*.+(html|nunjucks)', { allowEmpty: true })
        // Renders template with nunjucks
        .pipe(nunjucksRender({
            path: ['src/templates']
        }))
        // output files in app folder
        .pipe(gulp.dest('src/'))
});

/*============= Prod files ==============*/

gulp.task('nunjucks_dist', function () {
    // Gets .html and .nunjucks files in pages
    return gulp.src('src/**/*.+(html|nunjucks)', { allowEmpty: true })
        // Renders template with nunjucks
        .pipe(nunjucksRender({
            path: ['src/templates']
        }))
        // output files in app folder
        .pipe(gulp.dest('.'))
});

var htmlmin = require('gulp-htmlmin');

gulp.task('minifyhtml', function () {
    return gulp.src('*.html', { allowEmpty: true })
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('.'))
})

/*=============Join tasks==============*/

gulp.task('default', (done) => {
    runSequence('sass', 'minifyjs', 'minify_css', 'concat', 'nunjucks', 'watch',
    );
    done();
})

gulp.task('build', (done) => {
    runSequence(
        'svg_copytodest', 'images', 'fonts', 'sass', 'minify_css_dist', 'minify_css_fonts_dist', 'minifyjs', 'concat', 'concat_dist', 'nunjucks_dist', 'minifyhtml',
    );
    done();
})