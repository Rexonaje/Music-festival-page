document.addEventListener('DOMContentLoaded',function(){
    iniciarApp();
});

function iniciarApp(){
    navegacionFija();
    crearGaleria();
    scrollNav();
}
function navegacionFija(){
    const barra=document.querySelector('.header');
    const sobreFestival=document.querySelector('.sobre-festival');
    const body=document.querySelector('body');

    window.addEventListener('scroll',function () {
        if(sobreFestival.getBoundingClientRect().bottom < 0){ 
           barra.classList.add("fijo");
           body.classList.add('body-scroll');
        }else{
            barra.classList.remove("fijo"); 
            body.classList.remove('body-scroll');
        }
        console.log();
      })
}


function scrollNav(){
    const enlaces=document.querySelectorAll('.navegacion-principal a');
 
    enlaces.forEach(enlace => {
        enlace.addEventListener('click',(e)=>{
            e.preventDefault();
          const section=document.querySelector(e.target.attributes.href.value);
          section.scrollIntoView({behavior:'smooth'}); 
        });
    });
}
function crearGaleria(){
    const galeria=document.querySelector('.galeria-imagenes');


    for(let i=1;i<=12;i++){
        const imagen=document.createElement('PICTURE');
        imagen.innerHTML=`
        <source srcset="build/img/grande/${i}.avif" type="build/avif">
        <source srcset="build/img/grande/${i}.webp" type="build/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${i}.jpg" alt="imagen de galeria">
        `;
        imagen.onclick=function(){
            mostrarImagen(i);
        }
        
        galeria.appendChild(imagen);
    }
   
    
}
function mostrarImagen(id){
    const imagen=document.createElement('PICTURE');
    imagen.innerHTML=`
    <source srcset="build/img/grande/${id}.avif" type="build/avif">
    <source srcset="build/img/grande/${id}.webp" type="build/webp">
    <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen de galeria">
    `;
//crear overlay con imagen
    const overlay=document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

//añadir boton borrar
const cerrarModal=document.createElement('P');
cerrarModal.innerHTML='X';
cerrarModal.classList.add('btn-cerrar');
cerrarModal.onclick=function(){
    const body=document.querySelector('body');
    body.classList.remove('fijar-body');
    overlay.remove();

}

overlay.appendChild(cerrarModal);
//añadir al html
    const body=document.querySelector('body');
     body.appendChild(overlay);
     body.classList.add('fijar-body');

//remover al apretar en overlay 
     overlay.onclick=function(){
        const body=document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
     }
}