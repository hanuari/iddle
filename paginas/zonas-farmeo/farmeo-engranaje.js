import { datosJuego, obtenerGrupoActivo } from "../../objeto-juego-completo.js";
import { barraInterfazFarmear, mostrarAhoraTRabajando, mostrarZonasTrabajar } from "./farmeo-interfaz.js";
import { ZonasAleatoriaFactory } from "../../funciones/datos-zonas-farmeo/zonas-creadas/clase-zona-creadas.js"

export function seleccionarPersonajeUbicacion(idPersonaje) {

    const listaPersonajes = Array.from(datosJuego.personajes.values())
    listaPersonajes.forEach(personaje => {
        if (personaje.id_jugador === idPersonaje) {
            personaje.cambiarEstado(true);
            const grupo = obtenerGrupoActivo(datosJuego.grupos)
            grupo.identificarPersonajeActivo(idPersonaje)
        } else {
            personaje.cambiarEstado(false);
        }
    });

}

export function empezarFarmearZona(idUbicacion, idRecurso, zonaId) {
    const ubicacionACTUAL = datosJuego.ubicaciones.get(idUbicacion)
    const grupoActual = datosJuego?.grupos?.get(ubicacionACTUAL?.grupo_actual)

    if (!grupoActual) return;

    const personajeActivoID = grupoActual.personajeActivo
    const personajeActivo = datosJuego.personajes.get(personajeActivoID)

    const zonaActual = ubicacionACTUAL.encontrarZonaCreadaAleatoriamente(zonaId.col, zonaId.fila)

    const recursoEncontrado = zonaActual?.recursos?.find(
        (recurso) => Number(recurso.id_recurso) === Number(idRecurso)
    );

    if (!recursoEncontrado) return;

    recursoEncontrado.id_trabajador_activo = personajeActivoID
    recursoEncontrado.trabajoActivo = true

    const vinculacionTrabajorZona = personajeActivo.trabajoActivo

    if (vinculacionTrabajorZona === false) {
        personajeActivo.trabajo_actual = recursoEncontrado.id_ubicacion
        personajeActivo.trabajoActivo = true

        //si esta trabajando es true
    } else {
        const idTrabajoAntiguo = personajeActivo.trabajo_actual

        //aqui tengo que encotnrar el recurso antiguo
        const rescuroAnterior = ubicacionACTUAL.encontrarRecursoTrabajado(idTrabajoAntiguo)

        if (rescuroAnterior) {
            rescuroAnterior.id_trabajador_activo = null;
            rescuroAnterior.trabajoActivo = false
        }
        personajeActivo.trabajo_actual = recursoEncontrado.id_ubicacion
        personajeActivo.trabajoActivo = true

        cancelarBucle(rescuroAnterior.bucle?.id)
    }

    // actualizar para que no se muestre ahora.
    mostrarZonasTrabajar(idUbicacion, zonaId.col, zonaId.fila,)

    //mostrarLazonaAL otro lado.
    mostrarAhoraTRabajando(idUbicacion, zonaActual, recursoEncontrado)

    // ACCION DE FARMEARAHORA
    farmearAhora(zonaActual, recursoEncontrado, grupoActual)
}

function farmearAhora(zonaActual, recursoEncontrado, grupoActual) {
    const recursoBucle = recursoEncontrado.bucle;
    const idContenedorBarra = recursoBucle.idContenedorBarra;
    const objetoParaFarmear = datosJuego.recursos.get(recursoEncontrado.id_recurso);
    const tiempoRecurso = objetoParaFarmear.segundos;
    const idPersonajeActivo = grupoActual.personajeActivo;

    recursoEncontrado.id_trabajador_activo = idPersonajeActivo;

    let tiempoAcumulado = recursoBucle?.tiempoAcumulado;
    let ultimoTiempo = performance.now();
    let idBucle = null;

    function loopInfinito() {
        const tiempoActual = performance.now()
        const deltaTime = (tiempoActual - ultimoTiempo) / 1000
        const porcentaje = (tiempoAcumulado / tiempoRecurso) * 100;
        ultimoTiempo = tiempoActual
        tiempoAcumulado += deltaTime

        if (recursoEncontrado.cantidad <= 0) {
            cancelAnimationFrame(idBucle);
            barraInterfazFarmear(idContenedorBarra, 0);
            return;
        }

        if (tiempoAcumulado >= tiempoRecurso) {
            zonaActual.incremetarCantidadGenerada(objetoParaFarmear, recursoEncontrado);
            tiempoAcumulado %= tiempoRecurso;
            recursoEncontrado.tiempoAcumulado = tiempoAcumulado;
        }

        barraInterfazFarmear(idContenedorBarra, porcentaje)

        idBucle = requestAnimationFrame(loopInfinito);

        recursoEncontrado.bucle.id = idBucle;

        recursoEncontrado.bucle.tiempoAcumulado = tiempoAcumulado;

    }
    idBucle = requestAnimationFrame(loopInfinito);
}

function cancelarBucle(idBucle) {
    if (idBucle) {
        cancelAnimationFrame(idBucle)
    }
}

export function cancelarFarmeoAhora(idUbicacion, idRecurso, zonaId) {

    const ubicacionACTUAL = datosJuego.ubicaciones.get(idUbicacion)
    const grupoActual = datosJuego?.grupos?.get(ubicacionACTUAL?.grupo_actual)

    if (!grupoActual) return;

    const personajeActivoID = grupoActual.personajeActivo
    const personajeActivo = datosJuego.personajes.get(personajeActivoID)
    const zonaActual = ubicacionACTUAL.encontrarZonaCreadaAleatoriamente(zonaId.col, zonaId.fila)
    const recursoEncontrado = zonaActual?.recursos?.find(
        (recurso) => Number(recurso.id_recurso) === Number(idRecurso)
    );

    if (!recursoEncontrado) return;

    //recurso cancelar
    recursoEncontrado.id_trabajador_activo = null
    recursoEncontrado.trabajoActivo = false

    //personaje
    personajeActivo.trabajo_actual = null
    personajeActivo.trabajoActivo = false

    // actualizar para que no se muestre ahora.
    mostrarZonasTrabajar(idUbicacion, zonaId.col, zonaId.fila,)

    //mostrarLazonaAL otro lado.
    mostrarAhoraTRabajando(idUbicacion, zonaActual, recursoEncontrado)

    cancelarBucle(recursoEncontrado.bucle?.id)
}

export function crearZonasAleatoriaBioma(ubicacionActual) {
    const tipoUbicacion = ubicacionActual.tipo
    const tipo = ubicacionActual.provincia
    const tipoEncontrado = datosJuego.zonasGenerales.get(tipo)
    const terrenos = tipoEncontrado.terrenos;

    //Crear Los Enemigos De Esta ZONA
    const terrenoEnemigo = terrenos[tipoUbicacion]
    ubicacionActual.crearZonaEnemigo(terrenoEnemigo)

    const crearZonas = []
    const parametrosUbicacion = ubicacionActual.parametrosUbicacion
    const COLS_MAX = 4;

    for (let i = 0; i < parametrosUbicacion.ubicaciones; i++) {

        const x = i % COLS_MAX;
        const y = Math.floor(i / COLS_MAX);

        const recursosInyectar = probabilidad(parametrosUbicacion, terrenos, x, y, ubicacionActual.id_ubicacion);

        const key = `${ubicacionActual.id_ubicacion}-${x}-${y}`;

        const zonaRaw = {
            estructuras: [],
            grid: { col: x, fila: y },
            id_zona_creada_aleatoriamente: key,
            inventario: [],
            inventario_maximo: 10,
            inventario_zona_actual: 0,
            kg_maximo: 250,
            nivel: 0,
            provincia: tipoEncontrado.tipo,
            recursos: recursosInyectar.objetos,
            tipo: recursosInyectar.cordenadas,
            tipo_ubicacion: recursosInyectar.nombre,
            trabajoActivo: false,
        }
        crearZonas.push(zonaRaw);
    }

    const zonasInstanciadas = ZonasAleatoriaFactory.crear(crearZonas);

    zonasInstanciadas.forEach(zona => {
        datosJuego[ubicacionActual.provincia].set(zona.id_zona_creada_aleatoriamente, zona);
    });

    ubicacionActual.zonaCreada = true
}

function probabilidad(parametros, terrenos, x, y, idUbicacion) {
    const zonasTrabajar = parametros.zonas
    const recursosGlobales = parametros.recursosGlobalesMaximo
    const recursosMinimo = parametros.recursosMinimo
    const recursosMaximo = parametros.recursosMax
    const idubicacionZona = `idUbicacion-${idUbicacion}-posicion-${x}${y}`
    const cordenadas = sacarCordenadas(idubicacionZona)

    let retornarObjeto = []

    let recursosGlobalesAtope = 0
    let nombreGanador = ""

    while (recursosGlobalesAtope < recursosGlobales) {
        nombreGanador = sacarNombre(zonasTrabajar)
        const idRecurso = Number(sacarIDAleatorioRecurso(nombreGanador, terrenos))

        let cantidadMaterialesAleatorio = Math.floor(
            Math.random() * (recursosMaximo - recursosMinimo + 1)
        ) + recursosMinimo;

        if (cantidadMaterialesAleatorio <= 0) cantidadMaterialesAleatorio = 1;

        if (recursosGlobalesAtope + cantidadMaterialesAleatorio > recursosGlobales) {
            cantidadMaterialesAleatorio = recursosGlobales - recursosGlobalesAtope;
        }

        const recursoExistente = retornarObjeto.find(item => item.id_recurso === idRecurso);
        const idUbicacionConZona = `${idubicacionZona}-objeto-${idRecurso}`

        if (recursoExistente) {
            recursoExistente.cantidad += cantidadMaterialesAleatorio;

        } else {
            retornarObjeto.push({
                cantidad: cantidadMaterialesAleatorio,
                clase_activo: "activo",
                clase_ocultar: "ocultar",
                id_recurso: idRecurso,
                id_ubicacion: idUbicacionConZona,
                tipo: cordenadas,
                tipo_ubicacion: nombreGanador,
                bucle: {
                    id: null,
                    porcentaje: 0,
                    tiempoAcumulado: 1,
                    idContenedorBarra: `barra-${idUbicacionConZona}`,
                    id_trabajador_activo: null,
                }
            });
        }
        recursosGlobalesAtope += cantidadMaterialesAleatorio;
    }

    return {
        objetos: retornarObjeto,
        nombre: nombreGanador,
        cordenadas: cordenadas,
    }
}

function sacarCordenadas(idubicacionZona) {
    const ubicacion = idubicacionZona.split("-")[3];

    const mapaCoordenadas = {
        "00": "noroeste",
        "10": "norte",
        "20": "noreste",
        "21": "este",
        "22": "sureste",
        "12": "sur",
        "02": "suroeste",
        "01": "oeste",
        "11": "centro"
    };

    return mapaCoordenadas[ubicacion] || "centro";
}

function sacarIDAleatorioRecurso(nombreGanador, terrenos) {
    const arrayID = terrenos[nombreGanador].recursosID
    const indiceAleatorio = Math.floor(Math.random() * arrayID.length);
    const idGanador = arrayID[indiceAleatorio];
    return idGanador
}

function sacarNombre(zonasTrabajar) {
    let nombreTipo = ""
    let sumatoria = 0

    for (const [terreno, cantidad] of Object.entries(zonasTrabajar)) {
        sumatoria += cantidad
    }
    const numeroAleatorioGanador = Math.floor(Math.random() * sumatoria) + 1;

    sumatoria = 0

    for (const [terreno, cantidad] of Object.entries(zonasTrabajar)) {
        sumatoria += cantidad

        if (sumatoria >= numeroAleatorioGanador) {
            nombreTipo = terreno
            return nombreTipo
        }
    }
    return nombreTipo
}







