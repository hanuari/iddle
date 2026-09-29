import { mostrarLugares, mostrarPersonajes, verTiempoCambiante, posicionarMensajeEnUbicacion, mostrarEnemigo, mostrarGruposPosibles, mostrarTiempoEvento } from "./mapa-interfaz.js";
import { datosJuego, obtenerGrupoActivo } from "../../objeto-juego-completo.js";
import { EventoViaje } from "../../funciones/datos-eventos/clase-eventos.js";
import { iniciarInterfazFarmeoUbicacion } from "../zonas-farmeo/farmeo-interfaz.js";


export function iniciarMapa() {
    const grupoActual = obtenerGrupoActivo(datosJuego.grupos)
    const ubicacionACTUAL = grupoActual.ubicacionActualObetner()
    mostrarLugares()
    mostrarPersonajes()
    mostrarGruposPosibles()
    //borrar despues es para los enemigos solamente, crear algo para iniciarlizar esto
    const ubicacionBosqueEspeso = datosJuego.ubicaciones.get(1)
    crearEnemigosZona(ubicacionBosqueEspeso)
}

export function trabajarMapa(boton) {
    const dataSetID = boton.dataset.id;
    const idUbicacion = Number(dataSetID.split("-")[1]);
    const ubicacionSiguiente = datosJuego.ubicaciones.get(idUbicacion);
    const grupoActual = obtenerGrupoActivo(datosJuego.grupos)

    grupoActual.ubicacionFuturaActualizar(ubicacionSiguiente.id_ubicacion, ubicacionSiguiente.grid.col, ubicacionSiguiente.grid.fila)


    if (grupoActual.ubicacionActual.col === ubicacionSiguiente.grid.col && grupoActual.ubicacionActual.fila === ubicacionSiguiente.grid.fila) {

        // tener en cuenta que puede que haga un nuevo boton para ver detalles sin tener que entrar 

        /*  const ubicazion = grupoActual.ubicacionActualObetner()
         ubicazion.abrirInterfaz(grupoActual) */

        iniciarInterfazFarmeoUbicacion(grupoActual)
        return
    }

    mostrarPequeñaInfo(grupoActual)

}

export function seleccionarGrupoEnMenu(idGrupoSeleccionado) {

    const listaDeGrupos = Array.from(datosJuego.grupos.values())
    listaDeGrupos.forEach(grupo => {
        if (grupo.id_grupo === idGrupoSeleccionado) {
            grupo.cambiarEstado(true);
        } else {
            grupo.cambiarEstado(false);
        }
    });
}


function mostrarPequeñaInfo(grupoActual) {
    const tiempoTodoSegundos = tiempoDesplazamiento()
    const tiempoMinutos = pasarMinutosSegundos(tiempoTodoSegundos.tiempoSegundos)
    posicionarMensajeEnUbicacion(grupoActual.ubicacionFutura.col, grupoActual.ubicacionFutura.fila)

    verTiempoCambiante(tiempoMinutos.minutos, tiempoMinutos.segundos)
    //inyectar tiempo al grupo
    grupoActual.tiempoViaje = tiempoTodoSegundos.tiempoSegundos

}

function pasarMinutosSegundos(tiempoTodoSegundos) {
    const min = Math.trunc(tiempoTodoSegundos / 60)
    const sec = tiempoTodoSegundos % 60
    return {
        minutos: min,
        segundos: sec
    }
}




// boton para elegir acciones.

export function botonElegidoMapa(boton) {
    const grupoActual = obtenerGrupoActivo(datosJuego.grupos)

    if (boton === "true") {
        crearEventoCamino(grupoActual, "viaje")


    }
    if (boton === "false") {
        console.log("cancelado")

    }
    if (boton === "detalle") {
        console.log("faltaDetalle")

    }

    //cerrarMensaje

    posicionarMensajeEnUbicacion(grupoActual.ubicacionFutura.col, grupoActual.ubicacionFutura.fila)
}



export function crearTiempoDesplazamiento(grupoActual, id_evento) {

    //se mueve  en el grupo
    grupoActual.cambiarUbicacion()
    //se mueve en la interfaz
    mostrarPersonajes()

    datosJuego.eventos.delete(id_evento)
}



function crearEventoCamino(grupoActual) {
    const min = 2;
    const max = 999;

    const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;

    const ahora = Date.now()
    const duracionMilisegundos = (grupoActual.tiempoViaje * 1000) + Date.now()

    const tiempoRestante = duracionMilisegundos - Date.now();

    const evento = {
        id_evento: grupoActual.id_grupo + numeroAleatorio,
        tipo: "viaje",
        grupoActual: grupoActual,
        idUbicacionA: grupoActual.ubicacionActual.id_ubicacion,
        idUbicacionB: grupoActual.ubicacionFutura.id_ubicacion,
        tiempoInicio: ahora,
        tiempoFin: duracionMilisegundos,
        tiempoRestante: tiempoRestante
    }

    const nuevoEvento = new EventoViaje(evento)

    datosJuego.eventos.set(nuevoEvento.id_evento, nuevoEvento)

    mostrarTiempoEvento(nuevoEvento.id_evento)
}

const tiempoViaje = {
    montaña: 200,
    bosque: 1,
    rio: 1,
    camino: 1,
    ciudad: 1,
    casa: 1,
    vacio: 1
};

const costeMinimoDeViaje = Math.min(...Object.values(tiempoViaje))


function calcularHeuristica(actual_X, actual_Y, objetivo_X, objetivo_Y) {
    const distX = Math.abs(actual_X - objetivo_X);
    const distY = Math.abs(actual_Y - objetivo_Y);
    return Math.max(distX, distY) * costeMinimoDeViaje;
}

function tiempoDesplazamiento() {
    const grupoActual = obtenerGrupoActivo(datosJuego.grupos)
    const idUbicacionActual = grupoActual.ubicacionActual.id_ubicacion
    const idUbicacionFutura = grupoActual.ubicacionFutura.id_ubicacion

    const ubicacionActual = datosJuego.ubicaciones.get(idUbicacionActual)
    const ubicacionSiguiente = datosJuego.ubicaciones.get(idUbicacionFutura)

    const ubicacionSiguiente_Columna_1 = ubicacionSiguiente.grid.col;
    const ubicacionSiguiente_Fila_1 = ubicacionSiguiente.grid.fila;

    let ubicacionActual_Columna = ubicacionActual.grid.col;
    let ubicacionActual_Fila = ubicacionActual.grid.fila;

    let listaAbierta = [];
    let listaCerrada = new Set();

    let nodoInicial = {
        x: ubicacionActual_Columna,
        y: ubicacionActual_Fila,
        tiempoAcumulado: 0,
        tiempoEstimadoMeta: calcularHeuristica(ubicacionActual_Columna, ubicacionActual_Fila, ubicacionSiguiente_Columna_1, ubicacionSiguiente_Fila_1),
        padre: null
    };

    nodoInicial.costeTotalEstimado = nodoInicial.tiempoAcumulado + nodoInicial.tiempoEstimadoMeta;

    listaAbierta.push(nodoInicial);

    while (listaAbierta.length > 0) {
        listaAbierta.sort((a, b) => a.costeTotalEstimado - b.costeTotalEstimado);
        let nodoActual = listaAbierta.shift();

        if (nodoActual.x === ubicacionSiguiente_Columna_1 && nodoActual.y === ubicacionSiguiente_Fila_1) {
            return {
                tiempoSegundos: nodoActual.tiempoAcumulado,
            };
        }

        listaCerrada.add(`${nodoActual.x},${nodoActual.y}`);

        const movimientos = [
            { x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 1, y: 0 },
            { x: -1, y: -1 }, { x: 1, y: -1 }, { x: -1, y: 1 }, { x: 1, y: 1 }
        ];

        for (let mov of movimientos) {
            let vecinoX = nodoActual.x + mov.x;
            let vecinoY = nodoActual.y + mov.y;
            let claveVecino = `${vecinoX},${vecinoY}`;

            if (listaCerrada.has(claveVecino)) continue;

            const datosVecino = compararUbicacionesTiempo(vecinoX, vecinoY);
            if (!datosVecino) continue;

            let costeTerreno = datosVecino.tiempoSegundos;

            let nuevoTiempoAcumulado = nodoActual.tiempoAcumulado + costeTerreno;
            let nuevoTiempoEstimado = calcularHeuristica(vecinoX, vecinoY, ubicacionSiguiente_Columna_1, ubicacionSiguiente_Fila_1);
            let nuevoCosteTotal = nuevoTiempoAcumulado + nuevoTiempoEstimado;

            let nodoExistente = listaAbierta.find(n => n.x === vecinoX && n.y === vecinoY);

            if (nodoExistente) {
                if (nuevoTiempoAcumulado < nodoExistente.tiempoAcumulado) {
                    nodoExistente.tiempoAcumulado = nuevoTiempoAcumulado;
                    nodoExistente.costeTotalEstimado = nuevoCosteTotal;
                    nodoExistente.padre = nodoActual;
                }
            } else {
                listaAbierta.push({
                    x: vecinoX,
                    y: vecinoY,
                    tiempoAcumulado: nuevoTiempoAcumulado,
                    tiempoEstimadoMeta: nuevoTiempoEstimado,
                    costeTotalEstimado: nuevoCosteTotal,
                    padre: nodoActual
                });
            }
        }
    }

    console.log("No se encontró una ruta posible.");
    return { tiempoSegundos: 0 };
}

function compararUbicacionesTiempo(X, Y) {
    let coincide = null;

    for (const ubicacion of datosJuego.ubicaciones.values()) {
        if (ubicacion.grid.col === X && ubicacion.grid.fila === Y) {
            coincide = ubicacion;
            break;
        }
    }

    if (!coincide) { return; }

    const tiempoSegundosTotales = comprobarTiempoUbicacion(coincide.tipo);

    return {
        tiempoSegundos: tiempoSegundosTotales,
        id: coincide.id_ubicacion,
        grid: { col: coincide.grid.col, fila: coincide.grid.fila }
    };
}

function comprobarTiempoUbicacion(tipo) {
    const tiempoSegundos = tiempoViaje[tipo];
    if (tiempoSegundos === undefined) {
        console.log(`⚠️ La ubicación "${tipo}" no existe.`);
        return 0;
    }
    return tiempoSegundos;
}

// QUE FUNCIONE LOS ENEMIGOS Y SE MUESTRRE.
export function crearEnemigosZona(ubicacion) {
    const existenEnemigos = ubicacion.zona_enemiga;
    if (existenEnemigos === null) { return }

    const enemigosPosibles = existenEnemigos.zonasEnemigos

    const numeroMaximo = enemigosPosibles.length;
    const numeroAleatorio = Math.floor(Math.random() * numeroMaximo);
    const enemigo = enemigosPosibles[numeroAleatorio];

    const idZonaEnemiga = Number(enemigo);

    const identificarZona = ubicacion.obtenerZonaId(idZonaEnemiga)
    const rangoDeAccionMaximo = identificarZona.radio_ataque;
    const rangoDeAccionMinimo = -rangoDeAccionMaximo;

    const ubicacionTerreno = ubicacion.grid;
    const ubicionTerrenoX = ubicacionTerreno.col;
    const ubicionTerrenoY = ubicacionTerreno.fila;

    let posicionEnemigoX;
    let posicionEnemigoY;
    let existeUbicacion;

    do {
        const rangoDeAccionX = Math.floor(Math.random() * (rangoDeAccionMaximo - rangoDeAccionMinimo + 1)) + rangoDeAccionMinimo;
        const rangoDeAccionY = Math.floor(Math.random() * (rangoDeAccionMaximo - rangoDeAccionMinimo + 1)) + rangoDeAccionMinimo;

        posicionEnemigoX = rangoDeAccionX + ubicionTerrenoX;
        posicionEnemigoY = rangoDeAccionY + ubicionTerrenoY;

        // Comprobamos si la posición choca con alguna existente
        existeUbicacion = ubicacion.existeEstaUbicacion(posicionEnemigoX, posicionEnemigoY)

    } while (!existeUbicacion);

    identificarZona.grid.col = posicionEnemigoX;
    identificarZona.grid.fila = posicionEnemigoY;

    const ubicacionEnemigos = ubicacion.existeEstaUbicacion(posicionEnemigoX, posicionEnemigoY)

    ubicacionEnemigos.enemigo_aqui = true

    mostrarEnemigo(identificarZona);
}



