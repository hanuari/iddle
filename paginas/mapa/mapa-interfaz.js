import { datosJuego } from "../../objeto-juego-completo.js";

const GAP = 4;
const ANCHO_CARTA = 220;
const ALTO_CARTA = 140;

// falta crear el mapa con modo INVISIBLE y que se pueda revelar e invenstigar.
// Dependiendo el nivel de investigacion se podra mover, saber enemigos posibles, si se puede farmear, movimiento enemigos patrones, etc, todo lo que quiera.

//MOSTRAR ENEMIGOS
export function mostrarLugares() {
    const ubicaciones = [...datosJuego.ubicaciones.values()];
    const zonas = document.getElementById("zonas-ubicaciones");

    if (!zonas) return;

    // 1. Creamos un contenedor fantasma en memoria (no afecta al DOM real todavía)
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < ubicaciones.length; i++) {
        const ubicacion = ubicaciones[i];
        if (!ubicacion || !ubicacion.grid) continue;

        const posicionX = ubicacion.grid.col * (ANCHO_CARTA + GAP);
        const posicionY = ubicacion.grid.fila * (ALTO_CARTA + GAP);

        // 2. Creamos el elemento botón de forma nativa
        const button = document.createElement("button");

        button.className = "tarjeta-mapa tarjeta-ubicaciones";
        button.dataset.id = `ubicacion-${ubicacion.id_ubicacion}`;
        button.style.left = `${posicionX}px`;
        button.style.top = `${posicionY}px`;

        // 3. Añadimos su contenido interno de manera limpia
        button.innerHTML = `
            <img src="${ubicacion.imagen}" alt="${ubicacion.nombre}" class="bg-tarjeta">
            <span class="titulo-tarjeta">${ubicacion.nombre}</span>
        `;

        // 4. Lo acumulamos en el fragmento (operación ultrarrápida en memoria)
        fragment.appendChild(button);
    }

    // 5. Vaciamos el contenedor e insertamos todo de golpe una sola vez
    zonas.innerHTML = "";
    zonas.appendChild(fragment);
}
export function mostrarPersonajes() {

    const grupo = [...datosJuego.grupos.values()];
    let contenedorVacioHtml = "";

    for (let i = 0; i < grupo.length; i++) {
        const sacarInfo = grupo[i];

        const element = sacarInfo.ubicacionActual

        if (!element) continue;

        const posicionX = element.col * (ANCHO_CARTA + GAP);
        const posicionY = element.fila * (ALTO_CARTA + GAP);

        contenedorVacioHtml += `
            <div id="ubicacion-${sacarInfo.id_grupo}" 
                    class="tarjeta-mapa personaje-mapa" 
                    style="left: ${posicionX}px; top: ${posicionY}px;">
                <img src="${sacarInfo.imagen_mapa}" alt="${sacarInfo.nombre}" class="bg-tarjeta">
                <span class="titulo-tarjeta">${sacarInfo.nombre}</span>
            </div>
        `;
    }

    const zonas = document.getElementById("zonas-personajes");
    if (zonas) zonas.innerHTML = contenedorVacioHtml;
}

function mensajeConfirmacion() {
    const confirmacionMovimiento = document.getElementById("confirmacion-movimiento")
    confirmacionMovimiento.classList.toggle("ocultar")
}

export function verTiempoCambiante(minutos, segundos) {
    const spanHTML = document.getElementById("tiempo-espera-llegada")
    let contenedorVacioHtml = ""
    contenedorVacioHtml = `
    ${minutos} min ${segundos} segundos

    `
    spanHTML.innerHTML = contenedorVacioHtml
}


export function posicionarMensajeEnUbicacion(col, fila) {
    const mensaje = document.querySelector('.mensaje-informativo-mapa');
    if (!mensaje) return;

    const posX = col * (ANCHO_CARTA + GAP);
    const posY = fila * (ALTO_CARTA + GAP);

    mensaje.style.position = 'absolute';
    mensaje.style.left = `${posX}px`;
    mensaje.style.top = `${posY}px`;
    mensaje.style.zIndex = '9999';

    mensajeConfirmacion()
}


export function mostrarEnemigo(identificarZona) {
    let contenedorVacioHtml = "";

    const zona = identificarZona.grid

    const zonaX = zona.col * (ANCHO_CARTA + GAP)
    const zonaY = zona.fila * (ALTO_CARTA + GAP)


    contenedorVacioHtml += `
            <div id="ubicacion-${identificarZona.id_zonaEnemiga}" 
                    class="tarjeta-mapa personaje-mapa" 
                    style="left: ${zonaX}px; top: ${zonaY}px;">
                <img src="${identificarZona.imagen}" alt="${identificarZona.nombre}" class="bg-tarjeta">
                <span class="titulo-tarjeta">${identificarZona.nombre}</span>
            </div>
        `;

    const zonas = document.getElementById("zonas-enemigas");
    if (zonas) zonas.innerHTML = contenedorVacioHtml;
}


export function mostrarGruposPosibles() {
    const contenedorHtml = document.getElementById("mostrar-grupos-posibles")
    const grupos = Array.from(datosJuego.grupos.values())
    let htmlVacio = ""

    for (let i = 0; i < grupos.length; i++) {
        const grupo = grupos[i];

        htmlVacio += `
    <div class="lista-caras-mapa">
         <h3>${grupo.nombre}</h3>
         <img src="${grupo.avatar}" alt="">
         <button class="lista-caras-mapa-boton" id="grupo-mapa-${grupo.id_grupo}">selecionar</button>

        <div class="ocultar" id="mostrar-viaje-${grupo.id_grupo}">
        
        <p>Viajando: <span id="tiempo-viaje-${grupo.id_grupo}">0</span></p>
        
        </div>
    </div>
  
`
    }

    contenedorHtml.innerHTML = htmlVacio
}

export function mostrarTiempoEvento() {



}