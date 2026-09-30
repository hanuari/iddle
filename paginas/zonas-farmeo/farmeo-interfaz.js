import { cerrarMenu } from "../../menu/menu-engranaje.js"
import { datosJuego, obtenerGrupoActivo } from "../../objeto-juego-completo.js"
import { crearZonasAleatoriaBioma } from "./farmeo-engranaje.js"

export function iniciarInterfazFarmeoUbicacion(grupo) {
    const mostrarFarmeo = document.getElementById("mostrar-farmeo")
    const idUbicacion = grupo.ubicacionActual.id_ubicacion
    const ubicacionActual = datosJuego.ubicaciones.get(idUbicacion)

    if (!ubicacionActual.zonaCreada) {
        crearZonasAleatoriaBioma(ubicacionActual);
    }

    cerrarMenu()
    mostrarFarmeo.classList.remove("ocultar")

    mostrarInformacionKGinventarioPersonal("mostrar-numeros-inventario-farmeo", grupo)

    inventarioPersonalUbicacion("inventario-personal", grupo)

    mostrarZonasFarmear(idUbicacion)

    mostrarAliadosGrupo(grupo)

    /*     const zonaActual = ubicacionActual.encontrarZonaCreadaAleatoriamente(ubicacionActual.grid.col, ubicacionActual.grid.fila);
        actualizarInventarioIconoFarmearZona(zonaActual) */
}

export function mostrarInformacionKGinventarioPersonal(contenedorHtml, grupo) {

    const personajeActual = grupo
    const contenedor = document.getElementById(contenedorHtml)

    contenedor.innerHTML = `
    <p>Cantidad actual <span id="capacidad-actual-personaje-${personajeActual.id_grupo}" class="numero-objetos"> 02 </span> kg / <span id="capacidad-maxima-personaje-${personajeActual.id_grupo}" class="numero-objetos"> 999 </span>kg </p>
    `
    inventarioPersonajeKgMax(personajeActual)
    inventarioPersonajeActualKG(personajeActual)
}

export function inventarioPersonajeKgMax(grupo) {
    const numeroInventario = grupo.actualizarInventarioKGMaximoGrupo()
    const contenedor = document.getElementById(`capacidad-maxima-personaje-${grupo.id_grupo}`)

    contenedor.innerText = numeroInventario
}

export function inventarioPersonajeActualKG(grupo) {
    const numeroInventario = grupo.actualizarIventarioKgActualGrupo()
    const contenedor = document.getElementById(`capacidad-actual-personaje-${grupo.id_grupo}`)

    contenedor.innerText = numeroInventario
}

export function mostrarDetallesZona(zona) {
    const contenedor = document.getElementById(`mostrar-detalles-zona-${zona}`)
    contenedor.classList.remove("ocultar")
}

export function apagarmostrarDetallesZona(zona) {
    const contenedor = document.getElementById(`mostrar-detalles-zona-${zona}`)
    contenedor.classList.add("ocultar")
}

export function inventarioPersonalUbicacion(contendor, grupo) {

    const ubicacionActual = grupo.ubicacionActualObetner()

    const inventarioPruebaJugador = document.getElementById(contendor)

    grupo.actualizarInventarioGrupo()

    let htmlVacio = ""
    let inventariomaximo = grupo.inventario_maximo

    const objetoTipo = grupo.inventario
    const objetosTotales = objetoTipo.length
    inventariomaximo -= objetosTotales

    for (let i = 0; i < objetosTotales; i++) {
        const item = objetoTipo[i];

        if ("id_recurso" in item) {
            const itemFarmeable = datosJuego.recursos.get(item.id_recurso)

            htmlVacio += `
             <div class="inventario-objetos">
                     <p><span id="inventario-personaje-recurso-${ubicacionActual.id_ubicacion}-${item.id_recurso}" class="numero-objetos">${item.cantidad}</span></p>
                     <img src="${itemFarmeable.imagen}" alt="">
                </div>
        `
        }

        if ("id_objeto" in item) {
            const itemObjeto = datosJuego.objetosPersonajes.get(item.id_objeto)

            htmlVacio += `
             <div class="inventario-objetos">
                <p><span id="inventario-personaje-objeto-${ubicacionActual.id_ubicacion}-${item.id_objeto}" class="numero-objetos">${item.cantidad}</span></p>  
                <img src=${itemObjeto.imagen} alt="">
                </div>
        `
        }
    }

    inventarioPruebaJugador.innerHTML = htmlVacio
    inventarioVacio(inventariomaximo, inventarioPruebaJugador)
}

export function inventarioVacio(numeroInventarioMaximoPersonaje, contenedorHTML) {
    let htmlVacio = ""
    for (let i = 0; i < numeroInventarioMaximoPersonaje; i++) {
        const element = i;
        htmlVacio += `
         <div class="inventario-vacio">
         
         </div>
        `
    }
    contenedorHTML.innerHTML += htmlVacio
}

export function mostrarAliadosGrupo(grupo) {
    const contenedorHTML = document.getElementById("mostrar-aliados-grupo")

    mostrarNombreGrupoUbicacion(grupo)
    const grupoActivo = obtenerGrupoActivo(datosJuego.grupos)
    const ubicacionActual = grupoActivo.ubicacionActualObetner()
    let htmlVacio = ""

    for (let i = 0; i < grupoActivo.grupo.length; i++) {
        const idPersonajes = grupoActivo.grupo[i];
        const personaje = datosJuego.personajes.get(idPersonajes)

        htmlVacio += `

         <div class="lista-caras-ubicacion-boton">
                <img src="${personaje.avatar}" alt="">
                <p>${personaje.nombre}</p>
                <button id="activar-ubicacion-${ubicacionActual.id_ubicacion}-campeon-${personaje.id_jugador}">activar</button>
            </div>
        `
    }
    contenedorHTML.innerHTML = htmlVacio
}

function mostrarNombreGrupoUbicacion(grupo) {
    const contenedorNombreGrupo = document.getElementById("nombre-grupo-ubicacion")
    contenedorNombreGrupo.innerText = `${grupo.nombre}`
}

export function mostrarZonasFarmear(idUbicacion) {
    const zonas = document.getElementById("zonas-farmear");
    if (!zonas) return;

    const fragment = document.createDocumentFragment();
    const ubicacionActual = datosJuego.ubicaciones.get(idUbicacion);

    const zonaEncontrada = ubicacionActual.encontrarZonaUbicacion();

    for (const valor of zonaEncontrada.values()) {

        const recursosTrabajar = valor.recursos;
        const provincia = valor.provincia;
        const provinciaLocalizada = datosJuego.zonasGenerales.get(provincia);

        const dentroDeZona = provinciaLocalizada.terrenos[valor.tipo_ubicacion];


        // 1. Generamos el HTML para los iconos de recursos superpuestos
        let htmlRecursos = "";
        for (let i = 0; i < recursosTrabajar.length; i++) {
            const element = recursosTrabajar[i];
            const idObjeto = element.id_recurso;
            const recursoSolo = ubicacionActual.encontrarRecursos(idObjeto);

            if (recursoSolo && recursoSolo.imagen) {
                htmlRecursos += `<img src="${recursoSolo.imagen}" class="icono-recurso" alt="${recursoSolo.nombre}">`;
            }
        }

        const button = document.createElement("button");
        button.className = "tarjeta-zona";
        button.dataset.id = `zona-${valor.grid.col}-${valor.grid.fila}`;
        button.dataset.ubicacion = `${idUbicacion}`

        // 2. Estructuramos el contenido con capas superpuestas
        button.innerHTML = `
            <img src="${dentroDeZona.fondoPantalla}" class="bg-tarjeta">
             <div class="capa-contenido">
                <span class="titulo-tarjeta">${valor.tipo}</span>
                <div class="contenedor-recursos">
                    ${htmlRecursos}
                </div>
            </div>
        `;

        fragment.appendChild(button);
    }

    zonas.innerHTML = "";
    zonas.appendChild(fragment);
}

export function mostrarZonasTrabajar(idUbicacion, col, fila,) {
    const contenedorUbicacion = document.getElementById("trabajar-zona-seleccionado")

    contenedorUbicacion.classList.remove("ocultar")

    let contenedorVacioObjetos = ""

    const ubicacionActual = datosJuego.ubicaciones.get(idUbicacion);
    const zonaActual = ubicacionActual.encontrarZonaCreadaAleatoriamente(col, fila);

    for (let i = 0; i < zonaActual.recursos.length; i++) {
        const element = zonaActual.recursos[i];
        const objetoEncontrado = datosJuego.recursos.get(element.id_recurso)

        if (element.trabajoActivo === true) {
            continue;
        }
        contenedorVacioObjetos += `
            <div  class="recursos-farmear-zona ">
            
                <div class="boton-farmear-zona ">
                     <button data-ubicacion="${ubicacionActual.id_ubicacion}"
                     data-recurso = "${objetoEncontrado.id_recurso}"
                     data-col = "${zonaActual.grid.col}"
                    data-fila = "${zonaActual.grid.fila}"
                    class="boton-farmear">Farmear</button>
                </div>
         
                <img src="${objetoEncontrado.imagen}" alt="">
    
                <p>Recursos disponibles: <span
                    id="inventario-farmear-mostrar-${element.id_ubicacion}"
                    class="numero-objetos">${element.cantidad}</span>
                </p>
           
                <div id="personaje-trabajar-activo"> </div>
           
             </div>
    `
    }

    contenedorUbicacion.innerHTML = contenedorVacioObjetos
    mostrarZonaTrabajo(zonaActual)

    actualizarInventarioIconoFarmearZona(zonaActual)
}

export function actualizarInventarioIconoFarmearZona(zonaActual) {
    const contenedorHTML = document.getElementById("inventario-zona-informacion");
    if (!contenedorHTML) return;

    if (zonaActual.inventario.length === 0) {
        contenedorHTML.innerHTML = "";
        return;
    }

    const numeroDeHuecosZona = zonaActual.inventario_maximo;
    let html = "";

    for (let i = 0; i < numeroDeHuecosZona; i++) {
        const item = zonaActual.inventario[i];

        if (!item) {
            html += `<div class="zona-interfaz-almacen-vacio"></div>`;
            continue;
        }

        const objeto = datosJuego?.recursos?.get(item.id_recurso);
        const kgTotal = (objeto?.kg || 0) * item.cantidad;

        html += `
            <div class="zona-interfaz-almacen">
                <img src="${objeto?.imagen || ''}" alt="${objeto?.nombre || ''}">
                <p>nombre: ${objeto?.nombre || 'Desconocido'}</p>
                <p>Cantidad: <span>${item.cantidad}</span></p>
                <p>Kg Total: <span>${kgTotal}</span></p>
            </div>
        `;
    }
    contenedorHTML.innerHTML = html;
}

export function mostrarAhoraTRabajando(idUbicacion, zona, recursoEncontrado) {

    const contenedorVacio = document.getElementById("trabajar-zona-ahora-interface")

    let contenedorVacioObjetos = ""

    for (let i = 0; i < zona.recursos.length; i++) {
        const element = zona.recursos[i];
        const objetoEncontrado = datosJuego.recursos.get(element.id_recurso)

        const idPersonaje = Number(element.id_trabajador_activo)
        const personajeActual = datosJuego.personajes.get(idPersonaje)

        if (element.trabajoActivo === false || element.trabajoActivo === null || element.trabajoActivo === undefined) {
            continue;
        }
        contenedorVacioObjetos += `
               
            <div class="recursos-farmeando-zona">
                <div class="boton-cancelar-zona">
                    <button data-ubicacion="${idUbicacion}"
                        data-recurso = "${objetoEncontrado.id_recurso}"
                        data-col = "${zona.grid.col}"
                        data-fila = "${zona.grid.fila}"
                        class="boton-cantelar">Cancelar</button>
                </div>
         
                <img src="${objetoEncontrado.imagen}" alt="">
    
                <p>Recursos disponibles: <span
                    id="Recursos-trabajo-${element.id_ubicacion}"
                    class="numero-objetos">${element.cantidad}</span>
                </p>
                             
                <div class="barra-contenedor"> 
                                         
                    <div id="barra-${element.id_ubicacion}" class="barra-relleno">

                    </div>

                </div>  
                
                <div class="personaje-activo-trabajo">
                  <img src="${personajeActual.avatar}"> 
                </div>
                
            </div>

            <div id="personaje-trabajar-activo"> </div>
    `
    }
    contenedorVacio.innerHTML = contenedorVacioObjetos
}

export function barraInterfazFarmear(idBarra, porcentaje) {
    const elementoBarra = document.getElementById(idBarra);

    if (elementoBarra) {
        const progresoFinal = Math.min(porcentaje, 100);
        elementoBarra.style.width = `${progresoFinal}%`;
    }
}

export function mostrarZonaTrabajo(zonaActual) {
    const contenedorHtml = document.getElementById("interfaz-zona-trabajo")

    contenedorHtml.innerHTML = `
    <div>
        <div id="id-${zonaActual.id_zona_creada_aleatoriamente}">
        </div>
        
        <p>kg maximo:  <span class="inventario-actual-text" id="inventario-texto-actual-${zonaActual.id_zona_creada_aleatoriamente}">${zonaActual.inventario_zona_actual}</span>/<span class="inventario-lleno-text" id="inventario-maximo-${zonaActual.id_zona_creada_aleatoriamente}">${zonaActual.kg_maximo}</span>kg</p>
        <p>inventario actual:</p>
        
        <p>nivel actual: <span id="nivel-actual-${zonaActual.id_zona_creada_aleatoriamente}"> ${zonaActual.nivel}</span></p>
        <p>provincia: ${zonaActual.provincia}</p>
        <p>tipo de ubicacion: ${zonaActual.tipo_ubicacion}</p>
        
    </div>
    `
}














