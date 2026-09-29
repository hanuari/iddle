import { datosJuego } from "../../objeto-juego-completo.js";

export class ObjetoBase {
    constructor(data) {
        this.id_objeto = data.id_objeto;
        this.nombre = data.nombre;
        this.tipo = data.tipo;
        this.kg = data.kg;
        this.durabilidad = data.durabilidad || 50;
        this.dinero = data.dinero || 0;
        this.estadisticas = data.estadisticas || {
            ad: data.estadisticas.ad || 0,
            defensa: data.estadisticas.defensa || 0,
            destreza: data.estadisticas.destreza || 0,
            vida_extra: data.estadisticas.vida_extra || 0
        };
        this.ataque = data.ataque || null;
        this.espacio_ocupar = data.espacio_ocupar || 1;
        this.imagen = data.imagen || null;

        if (data.probabilidadGolpear) {
            this.probabilidadGolpear = data.probabilidadGolpear;
        }
    }
}

class ObjetoTrabajo extends ObjetoBase {
    constructor(data) {
        super(data);
    }

}

class ObjetoFactory {
    static crearObjeto(arrayPersonaje) {
        return arrayPersonaje.map(data => {
            switch (data.tipo.toLowerCase()) {
                case "cabeza":
                    return new ObjetoTrabajo(data);

                default:
                    return new ObjetoBase(data);
            }
        });
    }
}





export const objetosPersonajes = [
    {
        id_objeto: 1,
        nombre: "casco Prueba",
        tipo: "cabeza",
        kg: 10,
        durabilidad: 50,
        dinero: 20,
        estadisticas: {
            ad: 0,
            defensa: 2,
            destreza: 0,
            vida_extra: 10
        },
        ataque: null,
        espacio_ocupar: 1,
        imagen: "./src/img/equipamiento/casco.jfif",

    },
    {
        id_objeto: 2,
        nombre: "torso Prueba",
        tipo: "torso",
        kg: 10,
        dinero: 20,
        estadisticas: {
            ad: 0,
            defensa: 2,
            destreza: 0,
            vida_extra: 10
        },
        ataque: null,
        espacio_ocupar: 1,
        imagen: "./src/img/equipamiento/torso.png",
        durabilidad: 50,
    },
    {
        id_objeto: 3,
        nombre: "piernaPrueba",
        tipo: "pierna",
        kg: 10,
        dinero: 20,
        estadisticas: {
            ad: 0,
            defensa: 2,
            destreza: 0,
            vida_extra: 10
        },
        ataque: null,
        espacio_ocupar: 1,
        imagen: "./src/img/equipamiento/pierna.png",
        durabilidad: 50,
    },
    {
        id_objeto: 4,
        nombre: "zapatosPrueba",
        tipo: "zapatos",
        kg: 10,
        dinero: 20,
        estadisticas: {
            ad: 0,
            defensa: 2,
            destreza: 0,
            vida_extra: 10
        },
        ataque: null,
        espacio_ocupar: 1,
        imagen: "./src/img/equipamiento/zapatos.png",
        durabilidad: 50,
    },
    {
        id_objeto: 5,
        nombre: "objeto_1Prueba",
        tipo: "objeto1",
        kg: 10,
        dinero: 20,
        estadisticas: {
            ad: 0,
            defensa: 2,
            destreza: 0,
            vida_extra: 10
        },
        ataque: null,
        espacio_ocupar: 1,
        imagen: "./src/img/equipamiento/objeto_1.png",
        durabilidad: 50,
    },
    {
        id_objeto: 6,
        nombre: "objeto_2Prueba",
        tipo: "objeto2",
        kg: 10,
        dinero: 20,
        estadisticas: {
            ad: 0,
            defensa: 2,
            destreza: 0,
            vida_extra: 10
        },
        ataque: null,
        espacio_ocupar: 1,
        imagen: "./src/img/equipamiento/carcaj.png",
        durabilidad: 50,
    },
    {
        id_objeto: 7,
        nombre: "municionPrueba",
        tipo: "municion",
        kg: 10,
        dinero: 20,
        estadisticas: {
            ad: 0,
            defensa: 2,
            destreza: 0,
            vida_extra: 10
        },
        ataque: null,
        espacio_ocupar: 1,
        imagen: "./src/img/equipamiento/carcaj.png",
        durabilidad: 50,
    },
    {
        id_objeto: 8,
        nombre: "recoleptorPrueba",
        tipo: "recoleptor",
        kg: 10,
        dinero: 20,
        estadisticas: {
            ad: 0,
            defensa: 2,
            destreza: 0,
            vida_extra: 10
        },
        ataque: null,
        espacio_ocupar: 1,
        imagen: "./src/img/equipamiento/carcaj.png",
        durabilidad: 50,
    },
    {
        id_objeto: 9,
        nombre: "espadaPrueba",
        tipo: "arma",
        kg: 10,
        dinero: 20,
        estadisticas: {
            ad: 0,
            defensa: 2,
            destreza: 0,
            vida_extra: 10,
            penetracion_plana: 5,
            penetracion_porcentaje: 0.30
        },
        ataque: {
            dano_base: 30,
            escalados: [
                { atributo: "ad", ratio: 0.45 },
            ],
            tipo_dano: "fisico"
        },
        probabilidadGolpear: [
            {
                parte: "cabeza",
                probabilidad: 41,

            },
            {
                parte: "torso",
                probabilidad: 21,
            },
            {
                parte: "brazo",
                lado: "derecho",
                probabilidad: 21,
            },
            {
                parte: "brazo",
                lado: "izquierdo",
                probabilidad: 21,

            },
            {
                parte: "pierna",
                lado: "derecha",
                probabilidad: 31,

            },
            {
                parte: "pierna",
                lado: "izquierda",
                probabilidad: 31,

            },


        ],
        espacio_ocupar: 1,
        imagen: "./src/img/equipamiento/hacha.png",
        durabilidad: 50,
    },
];

export const cantidadObjeto = ObjetoFactory.crearObjeto(objetosPersonajes)