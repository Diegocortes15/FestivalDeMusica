const {
    series,
    src,
    dest,
    watch,
    parallel
} = require('gulp'); //Importar gulp
// Series (secuencial), parallel (al tiempo)

const sass = require('gulp-sass'); //Enviar sass a css
const imagemin = require('gulp-imagemin'); //Imagenes con peso reducido del misma extencion
const notify = require('gulp-notify'); //Agregar notificaciones
const webp = require('gulp-webp'); // Generar version Webp de las imagenes
const concat = require('gulp-concat'); //Generar varios archivos de javaScript y enviarlos a un solo archivo

//Utilidades CSS
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

//Utilidades JS
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');

//Funcion que compila SASS

const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
}

function css() {
    return src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./build/css'));
}

// function minificarcss() {
//     return src(paths.scss)
//         .pipe(sass({
//             outputStyle: 'compressed'
//         }))
//         .pipe(dest('./build/css'));
// }

function javascript() {
    return src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest('./build/js'))
}

function imagenes() {
    return src(paths.imagenes)
        .pipe(imagemin())
        .pipe(dest('./build/img'))
        .pipe(notify({
            message: 'Imagen Minificada'
        }));
}

function versionWebp() {
    return src(paths.imagenes)
        .pipe(webp())
        .pipe(dest('./build/img'))
        .pipe(notify({
            message: 'Versión WebP lista'
        }));
}

function watchArchivos() {
    watch(paths.scss, css); // * = La carpeta actual - Todos los archivos con esa extensión
    watch(paths.js, javascript);
}

exports.css = css; //Hacer disponible nuestro codigo de forma externa
//exports.minificarcss = minificarcss; //Hacer disponible nuestro codigo de forma externa
exports.imagenes = imagenes; // Reducir peso de imagenes
exports.watchArchivos = watchArchivos; //Hacer disponible nuestro codigo de forma externa
exports.default = series(css, javascript, imagenes, versionWebp, watchArchivos);