import { datosJuego } from "../../objeto-juego-completo.js";

class PersonajeBase {
    constructor(data) {
        this.avatar = data.avatar || null;
        this.consumo_diario = {
            dinero: 0,
            comida: 10,
            agua: 10,
        };

        this.id_jugador = data.id_jugador;
        this.estado = data.estado || false
        this.nombre = data.nombre;
        this.tipo = data.tipo || "normal";
        this.nivel_ubicacion = {
            andalucia: { malaga: 1, sevilla: 1, granada: 1 },
            centro: { madrid: 1, villareal: 1 }
        }

        // ajustar para que solo este en un inventario
        this.inventario_maximo = data.inventario_maximo || 5;
        this.inventario = data.inventario || [];
        this.kg_maximo = data.kg_maximo || 50;
        this.kg_actual = data.kg_actual || 0

        this.trabajo_actual = data.trabajo_actual || null
        this.trabajoActivo = data.trabajoActivo || false
        this.niveles = {
            talar: 0,
            minar: 0,
        };

        this.id_ubicacion_zona = data.id_ubicacion_zona || null
        this.vida = {
            cabeza: { actual: 100, max: 100 },
            torso: { actual: 100, max: 100 },
            manoDerecha: { actual: 100, max: 100 },
            manoIzquierda: { actual: 100, max: 100 },
            piernaDerecha: { actual: 100, max: 100 },
            piernaIzquierda: { actual: 100, max: 100 },
        };

    }

    agregarZonaTRabajo() {
        const recursos = {




        }

    }

    agregarTipo(tipo) {
        this.tipo = tipo
    }
    cambiarEstado(activo) {
        this.estado = activo;
    }

    ActualizarInventarioActualPersonaje() {
        let cantidadTotal = 0

        for (let i = 0; i < this.inventario.length; i++) {
            const element = this.inventario[i];

            if ("id_objeto" in element) {
                const objeto = this.encontrarObjeto(element.id_objeto)
                cantidadTotal += objeto.kg * element.cantidad
            }
            if ("id_recurso" in element) {
                const recurso = this.encontrarRecursos(element.id_recurso)
                cantidadTotal += recurso.kg * element.cantidad

            }
        }
        this.kg_actual = cantidadTotal
        return
    }

    obtenerInventario() {
        let objeto = []

        for (let i = 0; i < this.inventario.length; i++) {
            const element = this.inventario[i];
            objeto.push(element)
        }

        return objeto
    }

    encontrarRecursos(id) {
        return datosJuego.recursos.get(id)
    }
    encontrarObjeto(id) {
        return datosJuego.objetosPersonajes.get(id)
    }
}


class GuerreroPelea extends PersonajeBase {
    constructor(data) {
        super(data);
        this.equipamiento = {
            casco: null,
            torso: null,
            manoDerecha: null,
            manoIzquierda: null,
            pierna: null,
            zapatos: null,
            municion: null,
            objeto_1: null,
            objeto_2: null,
            objeto_recoleptor: null,
        };
        this.tiempo_ataque = {
            cabeza: 1,
            torso: 1,
            manoDerecha: 1,
            manoIzquierda: 1,
            piernaDerecha: 1,
            piernaIzquierda: 1,
        };

    }
}

class PersonajeFactory {
    static crearPersonaje(arrayPersonaje) {
        return arrayPersonaje.map(data => {
            switch (data.tipo.toLowerCase()) {
                case "guerrero":
                    return new GuerreroPelea(data);

                default:
                    return new PersonajeBase(data);
            }
        });
    }
}


export const personajes = [
    {
        id_jugador: 1,
        nombre: "hanuari",
        tipo: "jugador",
        grid: { col: 2, fila: 0 },
        inventario: [
            { id_objeto: 1, cantidad: 1 },
            { id_objeto: 2, cantidad: 1 },
            { id_recurso: 2, cantidad: 22 },
            { id_recurso: 12, cantidad: 23 },
            { id_material: 2, cantidad: 24 },
            { id_material: 0, cantidad: 24 }
        ],
        inventario_maximo: 7,
        kg_maximo: 990,
        kg_actual: 0,
        niveles: {
            talar: 1,
            minar: 1,
        },
        imagen_mapa: "./src/img/mapa_personajes/personaje_ubicacion.png",
        imagen: "./src/img/campeones/draven_vertical.webp",
        vida: {
            cabeza: { actual: 100, max: 100 },
            torso: { actual: 100, max: 100 },
            manoDerecha: { actual: 100, max: 100 },
            manoIzquierda: { actual: 100, max: 100 },
            piernaDerecha: { actual: 100, max: 100 },
            piernaIzquierda: { actual: 100, max: 100 },
        },
        equipamiento: {
            casco: null,
            torso: null,
            manoDerecha: null,
            manoIzquierda: null,
            pierna: null,
            zapatos: null,
            municion: null,
            objeto_1: null,
            objeto_2: null,
            objeto_recoleptor: null,
        }
    },

    {
        id_jugador: 3,
        nombre: "Caitlyn",
        tipo: "guerrero",
        estado: true,
        avatar: "./src/img/cara_campeones/caitlyn_face.webp",
        inventario: [
            { id_objeto: 1, cantidad: 1 },
            { id_objeto: 2, cantidad: 1 },
            { id_recurso: 1, cantidad: 2 },
            { id_recurso: 12, cantidad: 3 },
            { id_recurso: 21, cantidad: 4 },

        ],
        inventario_maximo: 15,
        kg_maximo: 11,
        kg_actual: 0,
        niveles: {
            talar: 1,
            minar: 1,
        },
        imagen_mapa: "./src/img/mapa_personajes/personaje_ubicacion.png",
        imagen: "./src/img/campeones/caitlyn_vertical.webp",
        vida: {
            cabeza: { actual: 100, max: 100 },
            torso: { actual: 100, max: 100 },
            manoDerecha: { actual: 100, max: 100 },
            manoIzquierda: { actual: 100, max: 100 },
            piernaDerecha: { actual: 100, max: 100 },
            piernaIzquierda: { actual: 100, max: 100 },
        },
        tiempoAtaque: {
            cabeza: 1,
            torso: 1,
            manoDerecha: 1,
            manoIzquierda: 1,
            piernaDerecha: 1,
            piernaIzquierda: 1,
        },
        equipamiento: {
            casco: 1,
            torso: 2,
            manoDerecha: 9,
            manoIzquierda: null,
            pierna: 3,
            zapatos: 4,
            objeto_1: 5,
            objeto_2: 6,
            municion: 7,
            objeto_recoleptor: 8
        }
    },

    {
        id_jugador: 10,
        nombre: "Draven",
        tipo: "guerrero",
        ubicacion_actual: { x: 0, y: 1 },
        avatar: "./src/img/cara_campeones/draven_face.webp",
        inventario: [
            { id_objeto: 1, cantidad: 1 },
            { id_objeto: 2, cantidad: 1 },
            { id_recurso: 1, cantidad: 2 },
            { id_recurso: 12, cantidad: 3 },
            { id_recurso: 21, cantidad: 4 },
        ],
        tiempoAtaque: {
            cabeza: 1,
            torso: 1,
            manoDerecha: 1,
            manoIzquierda: 1,
            piernaDerecha: 1,
            piernaIzquierda: 1,
        },

        inventario_maximo: 15,
        kg_maximo: 40,
        kg_actual: 0,
        niveles: {
            talar: 1,
            minar: 1,
        },
        imagen: "./src/img/campeones/draven_vertical.webp",
        vida: {
            cabeza: { actual: 1, max: 20 },
            torso: { actual: 2, max: 20 },
            manoDerecha: { actual: 3, max: 30 },
            manoIzquierda: { actual: 4, max: 40 },
            piernaDerecha: { actual: 5, max: 50 },
            piernaIzquierda: { actual: 6, max: 60 },
        },
        equipamiento: {
            casco: 1,
            torso: 2,
            manoDerecha: 9,
            manoIzquierda: null,
            pierna: 3,
            zapatos: 4,
            objeto_1: 5,
            objeto_2: 6,
            municion: 7,
            objeto_recoleptor: 8
        }
    },

    {
        id_jugador: 2,
        nombre: "mula",
        tipo: "transporte",
        ubicacion_actual: { x: 0, y: 1 },
        inventario: [],
        inventario_maximo: 15,
        kg_maximo: 30,
        kg_actual: 1,
        niveles: {
            talar: 0,
            minar: 0,
        },
        imagen: null,
        vida: {
            cabeza: { actual: 100, max: 100 },
            torso: { actual: 100, max: 100 },
            manoDerecha: { actual: 100, max: 100 },
            manoIzquierda: { actual: 100, max: 100 },
            piernaDerecha: { actual: 100, max: 100 },
            piernaIzquierda: { actual: 100, max: 100 },
        },
        equipamiento: {
            casco: null,
            torso: null,
            manoDerecha: null,
            manoIzquierda: null,
            pierna: null,
            zapatos: null,
            municion: null,
            objeto_1: null,
            objeto_2: null,
            objeto_recoleptor: null,
        }
    }
];



export const cantidadPersonaje = PersonajeFactory.crearPersonaje(personajes);
