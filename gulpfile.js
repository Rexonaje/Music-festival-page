const { src, dest, watch, parallel } = require("gulp");
//css
const sass = require("gulp-sass")(require("sass"));
const plumber=require("gulp-plumber");
const autoprefixer=require('autoprefixer');
const cssnano = require('cssnano');
const postcss=require('gulp-postcss')
const sourcemaps=require('gulp-sourcemaps');
//imagenes
const cache=require('gulp-cache');
const imagemin=require('gulp-imagemin');
const webp=require("gulp-webp");
const avif=require('gulp-avif');
//javascript
const terser=require('gulp-terser');

function css(done) {
  src('src/scss/**/*.scss') //identificar archivo sass **/*.scss esta sntax apunta a todo lo que este dentro de la carpeta scss
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass()) //compilar
    .pipe( postcss( [autoprefixer(),cssnano()]))
    .pipe(sourcemaps.write(''))
    .pipe(dest("build/css")); //almacenar en disco duro

  done();
}
function imagenes(done){
  const opciones={
    optimizationLevel:3
  }
  src('src/img/**/*.{png,jpg}')
  .pipe(cache(imagemin(opciones) ) )
  .pipe(dest('build/img'))
  done();
}

function versionWebp(done){
   const opciones={
    quality:50//calidad de imagen webp
   };
   src('src/img/**/*.{png,jpg}')//buscará imagenes en esos formatos
    .pipe(webp(opciones)) //hace el webp, se importa al comienzp del archivo 
    .pipe(dest('build/img'))//almacena 
  done();
}

function versionAvif(done){
  const opciones={
   quality:50//calidad de imagen webp
  };
  src('src/img/**/*.{png,jpg}')//buscará imagenes en esos formatos
   .pipe(avif(opciones)) //hace el webp, se importa al comienzp del archivo 
   .pipe(dest('build/img'))//almacena 
 done();
}
function javascript(done){
  src('src/js/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(terser())
  .pipe(sourcemaps.write(''))
  .pipe(dest('build/js'));
  done();
}
function dev(done) {
    watch("src/scss/**/*.scss",css);
    watch("src/js/**/*.js",javascritp);//escucha cambios, compila y recarga la pagina,se lo deve llamar desde la terminar
    
    done();
  }
exports.css =css;
exports.javascript=javascript;
exports.imagenes=imagenes;
exports.versionWebp=versionWebp;
exports.versionAvif=versionAvif;
exports.dev=parallel(imagenes ,versionWebp,versionAvif,javascript, dev);