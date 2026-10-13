// ========== LIGHTBOX DE GALERIA POR CATEGORIA ==========
// Cada tarjeta de la galería tiene su propio botón "Ver más".
// Al hacer clic, se abre el lightbox mostrando SOLO las fotos de esa
// categoría (las que estén listadas en data-fotos, separadas por coma).

document.addEventListener('DOMContentLoaded', function () {
    var tarjetas = document.querySelectorAll('#GALERIA .galeria-item');
    var lightbox = document.getElementById('galeriaLightbox');
    var lightboxImg = document.getElementById('lightboxImg');
    var lightboxTitulo = document.getElementById('lightboxTitulo');
    var lightboxContador = document.getElementById('lightboxContador');
    var btnCerrar = document.getElementById('lightboxCerrar');
    var btnAnterior = document.getElementById('lightboxAnterior');
    var btnSiguiente = document.getElementById('lightboxSiguiente');

    if (!tarjetas.length || !lightbox) return;

    var fotosActuales = [];
    var categoriaActual = '';
    var indiceActual = 0;

    function abrirCategoria(tarjeta) {
        categoriaActual = tarjeta.dataset.categoria || '';
        fotosActuales = (tarjeta.dataset.fotos || '')
            .split(',')
            .map(function (f) { return f.trim(); })
            .filter(Boolean);

        if (!fotosActuales.length) return;

        indiceActual = 0;
        mostrarFoto();

        // Si solo hay una foto en esta categoría, ocultamos las flechas
        var soloUna = fotosActuales.length <= 1;
        btnAnterior.style.display = soloUna ? 'none' : 'flex';
        btnSiguiente.style.display = soloUna ? 'none' : 'flex';

        lightbox.classList.add('activo');
        document.body.style.overflow = 'hidden';
    }

    function cerrarLightbox() {
        lightbox.classList.remove('activo');
        document.body.style.overflow = '';
    }

    function mostrarFoto() {
        lightboxImg.src = fotosActuales[indiceActual];
        lightboxImg.alt = categoriaActual;
        lightboxTitulo.textContent = categoriaActual;
        lightboxContador.textContent = (indiceActual + 1) + ' / ' + fotosActuales.length;
    }

    function anterior() {
        indiceActual = (indiceActual - 1 + fotosActuales.length) % fotosActuales.length;
        mostrarFoto();
    }

    function siguiente() {
        indiceActual = (indiceActual + 1) % fotosActuales.length;
        mostrarFoto();
    }

    tarjetas.forEach(function (tarjeta) {
        var boton = tarjeta.querySelector('.btn-categoria');
        if (boton) {
            boton.addEventListener('click', function (e) {
                e.stopPropagation();
                abrirCategoria(tarjeta);
            });
        }
        // Clic en cualquier parte de la tarjeta también abre esa categoría
        tarjeta.addEventListener('click', function () { abrirCategoria(tarjeta); });
    });

    btnCerrar.addEventListener('click', cerrarLightbox);
    btnAnterior.addEventListener('click', anterior);
    btnSiguiente.addEventListener('click', siguiente);

    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) cerrarLightbox();
    });

    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('activo')) return;
        if (e.key === 'Escape') cerrarLightbox();
        if (e.key === 'ArrowLeft') anterior();
        if (e.key === 'ArrowRight') siguiente();
    });
});

// ============================================================
//  FOTOS DE LA GALERÍA — EDITA AQUÍ PARA AGREGAR MÁS FOTOS
// ============================================================
// Cada categoría tiene su nombre arriba y, abajo, la lista de
// fotos de esa categoría. Para agregar una foto nueva:
//
//   1. Sube el archivo de la foto a la carpeta "Img".
//   2. Agrega una línea nueva con su nombre, así:
//        'Img/nombre-de-tu-foto.jpg',
//
// Puedes poner las que quieras por categoría (1, 5, 20...).
// El botón "Ver más" y las flechas del lightbox se ajustan solos.
// ============================================================

const FOTOS_GALERIA = {

    'Realismo': [
        'Img/realismoleon.jpeg',
        // agrega aquí más fotos de Realismo, una por línea
    ],

    'Blackwork': [
        'Img/dragonchino.jpeg',
        'BlackWork1.jpeg',
        // agrega aquí más fotos de Blackwork, una por línea
    ],

    'Old School': [
        'Img/realismoleon.jpeg',
        // agrega aquí más fotos de Old School, una por línea
    ],

    'Geométrico': [
        'Img/geometrico.jpg',
        // agrega aquí más fotos de Geométrico, una por línea
    ],

    'Acuarela': [
        'Img/acuarela.jpg',
        // agrega aquí más fotos de Acuarela, una por línea
    ],

    'Lettering': [
        'Img/lettering.jpg',
        // agrega aquí más fotos de Lettering, una por línea
    ],

};

// ============================================================
//  LIGHTBOX DE GALERIA POR CATEGORIA (no hace falta tocar esto)
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
    var tarjetas = document.querySelectorAll('#GALERIA .galeria-item');
    var lightbox = document.getElementById('galeriaLightbox');
    var lightboxImg = document.getElementById('lightboxImg');
    var lightboxTitulo = document.getElementById('lightboxTitulo');
    var lightboxContador = document.getElementById('lightboxContador');
    var btnCerrar = document.getElementById('lightboxCerrar');
    var btnAnterior = document.getElementById('lightboxAnterior');
    var btnSiguiente = document.getElementById('lightboxSiguiente');

    if (!tarjetas.length || !lightbox) return;

    var fotosActuales = [];
    var categoriaActual = '';
    var indiceActual = 0;

    function abrirCategoria(categoria) {
        fotosActuales = FOTOS_GALERIA[categoria] || [];
        if (!fotosActuales.length) return;

        categoriaActual = categoria;
        indiceActual = 0;
        mostrarFoto();

        var soloUna = fotosActuales.length <= 1;
        btnAnterior.style.display = soloUna ? 'none' : 'flex';
        btnSiguiente.style.display = soloUna ? 'none' : 'flex';

        lightbox.classList.add('activo');
        document.body.style.overflow = 'hidden';
    }

    function cerrarLightbox() {
        lightbox.classList.remove('activo');
        document.body.style.overflow = '';
    }

    function mostrarFoto() {
        lightboxImg.src = fotosActuales[indiceActual];
        lightboxImg.alt = categoriaActual;
        lightboxTitulo.textContent = categoriaActual;
        lightboxContador.textContent = (indiceActual + 1) + ' / ' + fotosActuales.length;
    }

    function anterior() {
        indiceActual = (indiceActual - 1 + fotosActuales.length) % fotosActuales.length;
        mostrarFoto();
    }

    function siguiente() {
        indiceActual = (indiceActual + 1) % fotosActuales.length;
        mostrarFoto();
    }

    tarjetas.forEach(function (tarjeta) {
        var categoria = tarjeta.dataset.categoria;
        var boton = tarjeta.querySelector('.btn-categoria');
        if (boton) {
            boton.addEventListener('click', function (e) {
                e.stopPropagation();
                abrirCategoria(categoria);
            });
        }
        tarjeta.addEventListener('click', function () { abrirCategoria(categoria); });
    });

    btnCerrar.addEventListener('click', cerrarLightbox);
    btnAnterior.addEventListener('click', anterior);
    btnSiguiente.addEventListener('click', siguiente);

    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) cerrarLightbox();
    });

    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('activo')) return;
        if (e.key === 'Escape') cerrarLightbox();
        if (e.key === 'ArrowLeft') anterior();
        if (e.key === 'ArrowRight') siguiente();
    });
});