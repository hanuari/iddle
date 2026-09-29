import { datosJuego } from "../../objeto-juego-completo.js";

export class GrupoBase {
    constructor(data) {
        this.id_grupo = data.id_grupo;
        this.camino = data.camino;
        this.estilo = data.estilo;
        this.grupo = data.grupo || [];
        this.nombre = data.nombre;
        this.avatar = data.avatar
        this.ubicacionesPasar = data.ubicacionesPasar || null
        this.ubicacionActual = {
            id_ubicacion: data.ubicacionActual.id_ubicacion,
            col: data.ubicacionActual.col,
            fila: data.ubicacionActual.fila,
        }
        this.ubicacionFutura = data.ubicacionFutura ? {
            id_ubicacion: data.ubicacionFutura.id_ubicacion ?? null,
            col: data.ubicacionFutura.col ?? null,
            fila: data.ubicacionFutura.fila ?? null,
        } : null;
        this.inventario = data.inventario || [];
        this.inventario_maximo = data.inventario_maximo || 7
        this.limiteMiembros = data.limiteMiembros || 3
        this.estado = data.estado || false
        this.tipo = data.tipo || "normal"
        this.imagen_mapa = data.imagen_mapa || "../../src/img/mapa_personajes/personaje_ubicacion.png";
        this.kg_maximo = data.kg_maximo || 250
        this.kg_actual = data.kg_actual || 0
        this.tiempoViaje = data.tiempoViaje || null
        this.personajeActivo = data.personajeActivo || null

    }

    actualizarInventarioGrupo() {
        let inventarioIndividual = [];

        for (let i = 0; i < this.grupo.length; i++) {
            const element = this.grupo[i];
            const personajeDato = this.encontrarPersonajes(element);
            const probar = personajeDato.obtenerInventario();

            inventarioIndividual.push(probar);
        }

        const consolidado = {};

        inventarioIndividual.flat(Infinity).forEach(item => {
            const tipo = item.id_objeto !== undefined ? 'objeto' : 'recurso';
            const id = item.id_objeto || item.id_recurso;
            const clave = `${tipo}_${id}`;

            if (consolidado[clave]) {
                consolidado[clave].cantidad += item.cantidad;
            } else {
                consolidado[clave] = { ...item };
            }
        });

        this.inventario = Object.values(consolidado);
    }

    cambiarEstado(activo) {
        this.estado = activo;
    }

    identificarPersonajeActivo(idPersonajeActivo) {
        this.personajeActivo = idPersonajeActivo
        return
    }

    ubicacionFuturaActualizar(id, x, y) {
        if (!this.ubicacionFutura) {
            this.ubicacionFutura = {};
        }
        this.ubicacionFutura.id_ubicacion = id;
        this.ubicacionFutura.col = x;
        this.ubicacionFutura.fila = y;
    }
    cambiarUbicacion() {
        const constUbiActualizar = this.ubicacionActual.id_ubicacion
        const ubi = datosJuego.ubicaciones.get(constUbiActualizar)
        ubi.actualizarGrupoUbicacion(null)

        this.ubicacionActual.id_ubicacion = this.ubicacionFutura.id_ubicacion
        this.ubicacionActual.col = this.ubicacionFutura.col
        this.ubicacionActual.fila = this.ubicacionFutura.fila

        const constUbiFinal = this.ubicacionFutura.id_ubicacion
        const ubiMovernos = datosJuego.ubicaciones.get(constUbiFinal)
        ubiMovernos.actualizarGrupoUbicacion(this.id_grupo)

        return console.log("ubicacion Cambiada")
    }

    ubicacionActualObetner() {
        const id = this.ubicacionActual.id_ubicacion
        const ubi = datosJuego.ubicaciones.get(id)
        return ubi
    }

    actualizarInventarioKGMaximoGrupo() {
        let kgMxPersonaje = 0
        for (let i = 0; i < this.grupo.length; i++) {
            const element = this.grupo[i];
            const personajeDato = this.encontrarPersonajes(element)
            kgMxPersonaje += personajeDato.kg_maximo
        }
        return kgMxPersonaje
    }

    actualizarIventarioKgActualGrupo() {
        let inventarioKgActual = 0

        for (let i = 0; i < this.grupo.length; i++) {
            const element = this.grupo[i];
            const personajeDato = this.encontrarPersonajes(element)
            personajeDato.ActualizarInventarioActualPersonaje()
            inventarioKgActual += personajeDato.kg_actual
        }
        return inventarioKgActual
    }

    encontrarRecursos(id) {
        return datosJuego.recursos.get(id)
    }
    encontrarPersonajes(id) {
        return datosJuego.personajes.get(id)
    }

}

class grupoPeleas extends GrupoBase {
    constructor(data) {
        super(data);
    }
}

class GrupoFactory {
    static crear(array) {
        return array.map(data => {
            switch (data.tipo.toLowerCase()) {
                case "pelea":
                    return new grupoPeleas(data);

                default:
                    return new GrupoBase(data);
            }
        });
    }
}

export const datosGrupos = [
    {
        id_grupo: 1,
        camino: "rapido",
        estilo: "huida",
        grupo: [3, 10],
        nombre: "Grupo de la MUERTE",
        ubicacionActual: {
            id_ubicacion: 1,
            col: 1,
            fila: 3,
        },
        ubicacionFutura: {
            id_ubicacion: 4,
            col: 0,
            fila: 2,
        },
        tipo: "pelea",
        estado: true,
        avatar: "./src/img/cara_campeones/draven_face.webp",
        imagen_mapa: "./src/img/cara_campeones/draven_face.webp",
        personajeActivo: 3

    },
    {
        id_grupo: 2,
        camino: "rapido",
        estilo: "huida",
        grupo: [3],
        nombre: "Grupo noche",
        ubicacionActual: {
            id_ubicacion: 4,
            col: 0,
            fila: 2,
        },
        tipo: "normal",
        avatar: "./src/img/cara_campeones/caitlyn_face.webp",
        imagen_mapa: "./src/img/cara_campeones/caitlyn_face.webp",
    },
    {
        id_grupo: 3,
        camino: "rapido",
        estilo: "huida",
        grupo: [3, 10],
        nombre: "Sangure",
        ubicacionActual: {
            id_ubicacion: 4,
            col: 1,
            fila: 2,
        },
        tipo: "pelea",
        avatar: "./src/img/cara_campeones/yunara_face.webp",
        imagen_mapa: "./src/img/cara_campeones/yunara_face.webp",
    },
]


export const cantidadGrupos = GrupoFactory.crear(datosGrupos)