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

/*===========Compile SCSS==============*/

var sass = require('gulp-sass');
var lec = require('gulp-line-ending-corrector')

gulp.task('sass', function() {

    gulp.src('sass/base/*.scss').pipe(lec())
        .pipe(sass())
        .pipe(gulp.dest('css'));

    gulp.src('sass/blocks/*.scss').pipe(lec())
        .pipe(sass())
        .pipe(gulp.dest('css'));

    gulp.src('sass/layouts/*.scss').pipe(lec())
        .pipe(sass())
        .pipe(gulp.dest('css'));

    gulp.src('sass/modules/*.scss').pipe(lec())
        .pipe(sass())
        .pipe(gulp.dest('css'));
    
    gulp.src('sass/widgets/*.scss').pipe(lec())
        .pipe(sass())
        .pipe(gulp.dest('css'))

        .pipe(plumber())
        .pipe(sass({errLogToConsole: true}))
        .pipe(browserSync.reload({
            stream: true
        }))

});

/* =========Minify JS ========== */

gulp.task('minifyjs', function(){
    return gulp.src(['js/jquery-2.1.4.min.js',
                     'js/crum-mega-menu.js',
                     'js/swiper.jquery.min.js',
                     'js/theme-plugins.js',
                     'js/main.js',
                     'js/form-actions.js',
                     'js/velocity.min.js',
                     'js/ScrollMagic.min.js',
                     'js/animation.velocity.min.js',
                    ])
    .pipe(uglify())
    .pipe(gulp.dest('js/minified'))
});

/* =========Combine JS ========== */

/*Dev Files*/
gulp.task('concat', function() {
    return gulp.src(['js/jquery-2.1.4.min.js',
                    'js/crum-mega-menu.js',
                    'js/swiper.jquery.min.js',
                    'js/theme-plugins.js',
                    'js/main.js',
                    'js/form-actions.js',
                    'js/velocity.min.js',
                    'js/ScrollMagic.min.js',
                    'js/animation.velocity.min.js',
                    ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('js/combined'))
});

/*Prod Files*/
gulp.task('concat_dist', function() {
    return gulp.src('js/combined/**/*')
    .pipe(gulp.dest('dist/js/combined'))
});

/*===========Watch==============*/


gulp.task('watch', ['browserSync', 'sass'], function (){
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('templates/**/*.nunjucks', ['nunjucks']);
    gulp.watch('pages/**/*.nunjucks', ['nunjucks']);
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);

    // others
});


/*===========ON-Line synchronization from browsers==============*/

var browserSync = require('browser-sync');

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: '.'
        }
    })
})


/*===========Join files==============*/


var useref = require('gulp-useref');

gulp.task('useref', function(){
    var assets = useref.assets();

    return gulp.src('*.html')
        .pipe(assets)
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'))
});


var uglify = require('gulp-uglify');

gulp.task('useref', function(){
    var assets = useref.assets();

    return gulp.src('*.html')
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

gulp.task('useref', function(){
    var assets = useref.assets();

    return gulp.src('*.html')
        .pipe(assets)
        .pipe(gulpIf('*.js', uglify()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'))
});

/*===========Minify CSS Dev==============*/

gulp.task('minify_css', function(){
    return gulp.src(['css/fonts.css',
                     'css/crumina-fonts.css',
                     'css/normalize.css',
                     'css/grid.css',
                     'css/base.css',
                     'css/blocks.css',
                     'css/layouts.css',
                     'css/modules.css',
                     'css/widgets-styles.css',
                     'css/jquery.mCustomScrollbar.min.css',
                     'css/swiper.min.css',
                     'css/primary-menu.css',
                     'css/magnific-popup.css',
                     'fonts/**/*'
                    ])
    .pipe(gulpIf('*.css', minify_css()))                
    .pipe(gulp.dest('css/minified/'))
    .pipe(gulpIf('!*.css', gulp.dest('css/fonts/')))
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

gulp.task('minify_css_dist', function(){
    return gulp.src('css/minified/**/*')
    .pipe(gulp.dest('dist/css/minified/'))
})


/*==================Copy minified relevant fonts=========================*/
gulp.task('minify_css_fonts_dist', function(){
    return gulp.src('css/fonts/**/*')
    .pipe(gulp.dest('dist/css/fonts/'))
})


/*===========Minimization IMAGE==============*/


var imagemin = require('gulp-imagemin');

gulp.task('images', function(){
    return gulp.src('img/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});

var cache = require('gulp-cache');

gulp.task('images', function(){
    return gulp.src('img/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/img'))
});


gulp.task('compress', function() {
    gulp.src('img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});


/*=============Copy Fonts==============*/

gulp.task('fonts', function() {
    return gulp.src('fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
})


/*=============Auto-deleting temporary files==============*/

var del = require('del');

gulp.task('clean:dist', function(callback){
    del(['dist/**/*', '!dist/images', '!dist/images/**/*'], callback)
});


gulp.task('clean', function(callback) {
    del('dist');
    return cache.clearAll(callback);
})



/*============= nunjucks templates ==============*/

/*============= Dev files ==============*/
gulp.task('nunjucks', function() {
  // Gets .html and .nunjucks files in pages
  return gulp.src('pages/**/*.+(html|nunjucks)')
  // Renders template with nunjucks
  .pipe(nunjucksRender({
      path: ['templates']
    }))
  // output files in app folder
  .pipe(gulp.dest('.'))
});

/*============= Prod files ==============*/

gulp.task('nunjucks_dist', function() {
    // Gets .html and .nunjucks files in pages
    return gulp.src('pages/**/*.+(html|nunjucks)')
    // Renders template with nunjucks
    .pipe(nunjucksRender({
        path: ['templates']
      }))
    // output files in app folder
    .pipe(gulp.dest('dist/'))
  });

  var htmlmin = require('gulp-htmlmin');

  gulp.task('minifyhtml', function() {
    return gulp.src('dist/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'))
  })

/*=============Join tasks==============*/

var runSequence = require('run-sequence');

gulp.task('default', function(callback) {
    runSequence(['nunjucks', 'sass', 'browserSync', 'watch'],
        callback
    )
})

gulp.task('build', function(callback) {
    runSequence(
        //'clean:dist',
        ['images', 'fonts', 'sass', 'minify_css_dist', 'minify_css_fonts_dist', 'concat_dist', 'nunjucks_dist', 'minifyhtml'],
        callback
    )
})







