document.addEventListener('DOMContentLoaded', function () {
    scrollNav();
    navegacionFija();
});

function scrollNav() {
    const enlances = document.querySelectorAll('.navegacion-principal a');

    enlances.forEach(function (enlace) {
        enlace.addEventListener('click', function (e) {
            e.preventDefault();

            const seccion = document.querySelector(e.target.attributes.href.value);

            seccion.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function navegacionFija() {

    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const altoBarra = barra.offsetHeight;

    //Registrar el Intersection Observer
    const observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
            barra.classList.remove('fijo');
            sobreFestival.style.marginTop = `0px`;
        } else {
            barra.classList.add('fijo');
            sobreFestival.style.marginTop = `${altoBarra}px`;
        }
    });

    //Elemento a Observar
    observer.observe(document.querySelector('.contenido-video'));

}