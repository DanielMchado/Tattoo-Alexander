// ============================================================
//  FOTOS DE LA GALERÍA — AQUÍ AGREGAS TUS FOTOS
// ============================================================
// Cada categoría tiene su nombre arriba y, dentro de los
// corchetes [ ], la lista de fotos de ese estilo.
//
// Para agregar una foto nueva:
//   1. Copia la foto a la carpeta "Img" de tu proyecto.
//   2. Dentro de los corchetes de la categoría, agrega una línea:
//        'Img/nombre-de-tu-foto.jpg',
//      (entre comillas, con coma al final, una foto por línea)
//
// Puedes poner todas las fotos que quieras en cada categoría.
// Si una categoría queda vacía [ ], la ventana mostrará un
// mensaje de "pronto subiremos más trabajos".
// ============================================================

const FOTOS_GALERIA = {

    'Realismo': [
        'Img/realismoleon.jpeg',
        // 'Img/realismo-2.jpg',
    ],

    'Blackwork': [
        'Img/dragonchino.jpeg',
        // 'Img/blackwork-2.jpg',
    ],

    'Old School': [
        // 'Img/oldschool-1.jpg',
    ],

    'Geométrico': [
        // 'Img/geometrico-1.jpg',
    ],

    'Acuarela': [
        // 'Img/acuarela-1.jpg',
    ],

    'Lettering': [
        // 'Img/lettering-1.jpg',
    ],

};

// ============================================================
//  VENTANA MODAL + VISOR (no hace falta tocar esto)
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
    var tarjetas = document.querySelectorAll('#GALERIA .galeria-item');
    var modal = document.getElementById('modalGaleria');
    var modalTitulo = document.getElementById('modalTitulo');
    var modalGrid = document.getElementById('modalGrid');
    var modalCerrar = document.getElementById('modalCerrar');
    var visor = document.getElementById('visorFoto');
    var visorImg = document.getElementById('visorImg');
    var visorContador = document.getElementById('visorContador');
    var visorCerrar = document.getElementById('visorCerrar');
    var visorAnterior = document.getElementById('visorAnterior');
    var visorSiguiente = document.getElementById('visorSiguiente');

    if (!tarjetas.length || !modal || !visor) return;

    var categoriaActual = '';
    var fotosActuales = [];
    var indiceActual = 0;
    var elementoPrevio = null;

    // ---------- Ventana modal (cuadrícula de la categoría) ----------

    function abrirModal(categoria) {
        categoriaActual = categoria;
        fotosActuales = FOTOS_GALERIA[categoria] || [];
        elementoPrevio = document.activeElement;

        modalTitulo.textContent = categoria;
        modalGrid.textContent = '';
        modalGrid.scrollTop = 0;

        if (!fotosActuales.length) {
            var vacio = document.createElement('div');
            vacio.className = 'modal-vacio';
            vacio.innerHTML = '<i class="fas fa-images"></i><p>Pronto subiremos más trabajos de este estilo.</p>';
            modalGrid.appendChild(vacio);
        } else {
            fotosActuales.forEach(function (src, i) {
                var boton = document.createElement('button');
                boton.type = 'button';
                boton.className = 'modal-foto';
                boton.setAttribute('aria-label', 'Ampliar foto ' + (i + 1) + ' de ' + categoria);

                var img = document.createElement('img');
                img.src = src;
                img.alt = 'Tatuaje de ' + categoria + ' - foto ' + (i + 1);
                img.loading = 'lazy';

                boton.appendChild(img);
                boton.addEventListener('click', function () { abrirVisor(i); });
                modalGrid.appendChild(boton);
            });
        }

        modal.classList.add('activo');
        document.body.style.overflow = 'hidden';
        modalCerrar.focus();
    }

    function cerrarModal() {
        modal.classList.remove('activo');
        document.body.style.overflow = '';
        if (elementoPrevio && elementoPrevio.focus) elementoPrevio.focus();
    }

    // ---------- Visor (foto ampliada) ----------

    function mostrarEnVisor() {
        visorImg.src = fotosActuales[indiceActual];
        visorImg.alt = 'Tatuaje de ' + categoriaActual + ' - foto ' + (indiceActual + 1);
        visorContador.textContent = (indiceActual + 1) + ' / ' + fotosActuales.length;
        var variasFotos = fotosActuales.length > 1;
        visorAnterior.hidden = !variasFotos;
        visorSiguiente.hidden = !variasFotos;
    }

    function abrirVisor(indice) {
        indiceActual = indice;
        mostrarEnVisor();
        visor.classList.add('activo');
        visorCerrar.focus();
    }

    function cerrarVisor() {
        visor.classList.remove('activo');
    }

    function fotoAnterior() {
        indiceActual = (indiceActual - 1 + fotosActuales.length) % fotosActuales.length;
        mostrarEnVisor();
    }

    function fotoSiguiente() {
        indiceActual = (indiceActual + 1) % fotosActuales.length;
        mostrarEnVisor();
    }

    // ---------- Eventos ----------

    // Clic en una tarjeta (o en su botón "Ver más") abre esa categoría
    tarjetas.forEach(function (tarjeta) {
        tarjeta.addEventListener('click', function () {
            abrirModal(tarjeta.dataset.categoria);
        });
    });

    modalCerrar.addEventListener('click', cerrarModal);
    visorCerrar.addEventListener('click', cerrarVisor);
    visorAnterior.addEventListener('click', fotoAnterior);
    visorSiguiente.addEventListener('click', fotoSiguiente);

    // Clic en el fondo oscuro cierra
    modal.addEventListener('click', function (e) {
        if (e.target === modal) cerrarModal();
    });
    visor.addEventListener('click', function (e) {
        if (e.target === visor) cerrarVisor();
    });

    // Teclado: Esc cierra (primero el visor, luego la ventana), flechas cambian de foto
    document.addEventListener('keydown', function (e) {
        var visorAbierto = visor.classList.contains('activo');
        var modalAbierto = modal.classList.contains('activo');

        if (e.key === 'Escape') {
            if (visorAbierto) cerrarVisor();
            else if (modalAbierto) cerrarModal();
        }
        if (visorAbierto && fotosActuales.length > 1) {
            if (e.key === 'ArrowLeft') fotoAnterior();
            if (e.key === 'ArrowRight') fotoSiguiente();
        }
    });
});