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
        'Img/BlackWork1.jpeg',
        // 'Img/oldschool-2.jpg',
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
//  PANTALLA DE CARGA
// ============================================================

(function () {
    var loader  = document.getElementById('loader');
    var barra   = document.getElementById('loaderBarra');
    var pct     = document.getElementById('loaderPct');

    if (!loader) return;

    // ⏱️ TIEMPO MÍNIMO QUE SE VE LA PANTALLA DE CARGA (en milisegundos)
    // 4000 = 4 segundos. Cámbialo aquí si lo quieres más corto o más largo.
    // Si cambias este valor, cambia también la duración (4s) de las animaciones
    // .trazo-path y .maquina-wrap en jalex.css para que vayan sincronizadas.
    var DURACION_MINIMA = 4000;

    // Seguro: si la página tarda muchísimo en cargar, cierra igual a los 12 s
    var DURACION_MAXIMA = 12000;

    var inicio    = Date.now();
    var cargado   = false;   // ¿ya cargó toda la página?
    var terminado = false;   // evita cerrar dos veces

    var timer = setInterval(function () {
        var transcurrido = Date.now() - inicio;

        // La barra avanza según el tiempo, así llega al final justo a los 4 s.
        // Se queda en 99% si la página aún no termina de cargar.
        var progreso = Math.min((transcurrido / DURACION_MINIMA) * 100, 99);
        barra.style.width = progreso + '%';
        pct.textContent   = Math.round(progreso) + '%';

        // Solo cierra cuando pasó el tiempo mínimo Y la página ya cargó
        if (transcurrido >= DURACION_MINIMA && cargado) {
            terminar();
        }
    }, 30);

    // Lleva al 100% y oculta la pantalla de carga
    function terminar() {
        if (terminado) return;
        terminado = true;
        clearInterval(timer);
        barra.style.width = '100%';
        pct.textContent   = '100%';
        setTimeout(function () {
            loader.classList.add('oculto');
            // Elimina del DOM tras la transición para liberar memoria
            setTimeout(function () { loader.remove(); }, 650);
        }, 350);
    }

    // Marca que la página ya cargó (pero NO cierra todavía: espera los 4 s)
    function alCargar() { cargado = true; }

    if (document.readyState === 'complete') {
        alCargar();
    } else {
        window.addEventListener('load', alCargar);
        // Seguro por si el evento "load" tarda demasiado
        setTimeout(function () { alCargar(); }, DURACION_MAXIMA);
    }
})();

// ============================================================
//  GALERÍA: FILTROS + MODAL + VISOR
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

    // ---- Filtros de categoría ----
    var filtros   = document.querySelectorAll('.filtro-btn');
    var items     = document.querySelectorAll('#galeriaGrid .galeria-item');

    filtros.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var cat = btn.dataset.filtro;

            // Activo visual
            filtros.forEach(function (b) { b.classList.remove('activo'); });
            btn.classList.add('activo');

            // Mostrar / ocultar items
            items.forEach(function (item) {
                if (cat === 'todos' || item.dataset.categoria === cat) {
                    item.classList.remove('oculto');
                } else {
                    item.classList.add('oculto');
                }
            });
        });
    });

    // ---- Modal + Visor ----
    var modal         = document.getElementById('modalGaleria');
    var modalTitulo   = document.getElementById('modalTitulo');
    var modalGrid     = document.getElementById('modalGrid');
    var modalCerrar   = document.getElementById('modalCerrar');
    var visor         = document.getElementById('visorFoto');
    var visorImg      = document.getElementById('visorImg');
    var visorContador = document.getElementById('visorContador');
    var visorCerrar   = document.getElementById('visorCerrar');
    var visorAnterior = document.getElementById('visorAnterior');
    var visorSiguiente= document.getElementById('visorSiguiente');

    if (!modal || !visor) return;

    var categoriaActual = '';
    var fotosActuales   = [];
    var indiceActual    = 0;
    var elementoPrevio  = null;

    // --- Modal (cuadrícula de categoría) ---

    function abrirModal(categoria) {
        categoriaActual = categoria;
        fotosActuales   = FOTOS_GALERIA[categoria] || [];
        elementoPrevio  = document.activeElement;

        modalTitulo.textContent = categoria;
        modalGrid.textContent   = '';
        modalGrid.scrollTop     = 0;

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
                img.src     = src;
                img.alt     = 'Tatuaje de ' + categoria + ' - foto ' + (i + 1);
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

    // --- Visor (foto ampliada) ---

    function mostrarEnVisor() {
        visorImg.src = fotosActuales[indiceActual];
        visorImg.alt = 'Tatuaje de ' + categoriaActual + ' - foto ' + (indiceActual + 1);
        visorContador.textContent = (indiceActual + 1) + ' / ' + fotosActuales.length;
        var varias = fotosActuales.length > 1;
        visorAnterior.hidden  = !varias;
        visorSiguiente.hidden = !varias;
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

    // --- Eventos ---

    // Clic en tarjeta de galería abre el modal de esa categoría
    items.forEach(function (item) {
        item.addEventListener('click', function () {
            abrirModal(item.dataset.categoria);
        });
    });

    modalCerrar.addEventListener('click', cerrarModal);
    visorCerrar.addEventListener('click', cerrarVisor);
    visorAnterior.addEventListener('click', fotoAnterior);
    visorSiguiente.addEventListener('click', fotoSiguiente);

    // Clic en fondo oscuro cierra
    modal.addEventListener('click', function (e) { if (e.target === modal) cerrarModal(); });
    visor.addEventListener('click', function (e)  { if (e.target === visor)  cerrarVisor();  });

    // Teclado: Esc cierra, flechas navegan
    document.addEventListener('keydown', function (e) {
        var visorAbierto = visor.classList.contains('activo');
        var modalAbierto = modal.classList.contains('activo');

        if (e.key === 'Escape') {
            if (visorAbierto) cerrarVisor();
            else if (modalAbierto) cerrarModal();
        }
        if (visorAbierto && fotosActuales.length > 1) {
            if (e.key === 'ArrowLeft')  fotoAnterior();
            if (e.key === 'ArrowRight') fotoSiguiente();
        }
    });
});

// ============================================================
//  APARECER AL HACER SCROLL
// ============================================================
// Las secciones con class="revelar" aparecen suavemente al
// entrar en pantalla y se ocultan si el usuario sube.

document.addEventListener('DOMContentLoaded', function () {
    if (!document.documentElement.classList.contains('js-revelar')) return;

    var secciones = document.querySelectorAll('.revelar');
    var pendiente = false;

    function actualizar() {
        pendiente = false;
        var altoPantalla = window.innerHeight;

        secciones.forEach(function (seccion) {
            var caja = seccion.getBoundingClientRect();

            if (caja.top < altoPantalla * 0.88 && caja.bottom > 0) {
                seccion.classList.add('visible');
            } else if (caja.top >= altoPantalla) {
                seccion.classList.remove('visible');
            }
        });
    }

    function alHacerScroll() {
        if (!pendiente) {
            pendiente = true;
            window.requestAnimationFrame(actualizar);
        }
    }

    window.addEventListener('scroll', alHacerScroll, { passive: true });
    window.addEventListener('resize', alHacerScroll);
    actualizar();
});