
// enemigo.class.js (o donde guardes las clases)

export class EnemigoBase {
    constructor(data) {
        this.id_enemigo = data.id_enemigo;
        this.nombre = data.nombre;
        this.tipo = data.tipo || "desconocido"; // animal, humanoide, monstruo...
        this.nivel = data.nivel || 1;
        this.imagen = data.imagen || null;
        this.ubicacionesPosibles = data.ubicacionesPosibles || [];

        // Aquí guardamos las partes (con su vida, defensa y prob de ser golpeadas)
        this.partes = data.partes || [];

        // Botín al morir
        this.recompensas = data.recompensas || [];
    }

    recibirGolpeAleatorio() {
        const probTotal = this.partes.reduce((sum, p) => sum + p.probabilidad, 0);
        let random = Math.random() * probTotal;

        for (const parte of this.partes) {
            if (random < parte.probabilidad) {
                return parte;
            }
            random -= parte.probabilidad;
        }
    }
}

export class EnemigoAnimal extends EnemigoBase {
    constructor(data) {
        super(data);
    }
}

export class EnemigoHumanoide extends EnemigoBase {
    constructor(data) {
        super(data);
    }
}


class ObjetosEnemigos {
    static crearEnemigo(arrayPersonaje) {
        return arrayPersonaje.map(data => {
            switch (data.tipo.toLowerCase()) {
                case "animal":
                    return new EnemigoAnimal(data);
                case "humano":
                    return new EnemigoHumanoide(data);
                default:
                    return new EnemigoBase(data);
            }
        });
    }
}


export const ataquesBase = {

    mordisco: {
        nombre: "mordisco",
        dañoMin: 10,
        dañoMax: 20
    },

    embestida: {
        nombre: "embestida",
        dañoMin: 5,
        dañoMax: 12
    },

    zarpazo: {
        nombre: "zarpazo",
        dañoMin: 5,
        dañoMax: 10
    },

    patada: {
        nombre: "patada",
        dañoMin: 4,
        dañoMax: 8
    }
}

export const partesBase = {

    cabeza: {
        nombreMostrar: "Cabeza",

        ataques: [
            {
                ataque: "mordisco",
                probabilidad: 80
            },
            {
                ataque: "embestida",
                probabilidad: 20
            }
        ]
    },

    torso: {
        nombreMostrar: "Torso",

        ataques: [
            {
                ataque: "zarpazo",
                probabilidad: 100
            }
        ]
    },

    brazo: {
        nombreMostrar: "Brazo",

        ataques: [
            {
                ataque: "zarpazo",
                probabilidad: 100
            }
        ]
    },

    pierna: {
        nombreMostrar: "Pierna",

        ataques: [
            {
                ataque: "patada",
                probabilidad: 100
            }
        ]
    }
}


export const enemigos = [
    {
        tipo: "animal",
        id_enemigo: 1,
        nombre: "lobo",
        nivel: 1,
        imagen: "./src/img/enemigos/lobos.jpg",
        ubicacionesPosibles: [1, 2],
        partes: [
            {
                parte: "cabeza",
                probabilidad: 40,
                vida: 100,
                defensa: 2
            },
            {
                parte: "torso",
                probabilidad: 20,

                vida: 50,
                defensa: 5
            },
            {
                parte: "brazo",
                lado: "derecho",
                probabilidad: 20,
                vida: 20,
                defensa: 10
            },
            {
                parte: "brazo",
                lado: "izquierdo",
                probabilidad: 20,
                vida: 21,
                defensa: 10
            },
            {
                parte: "pierna",

                lado: "derecha",
                probabilidad: 30,
                vida: 35,
                defensa: 3
            },
            {
                parte: "pierna",
                lado: "izquierda",
                probabilidad: 30,
                vida: 45,
                defensa: 3
            }
        ],
        recompensas: [
            {
                id_recurso: 1,
                cantidadMin: 1,
                cantidadMax: 3,
                probabilidad: 80
            }
        ]
    },
    {
        tipo: "animal",
        id_enemigo: 2,
        nombre: "oso",
        nivel: 5,
        imagen: "./src/img/enemigos/oso.png",
        ubicacionesPosibles: [1, 2],
        partes: [
            {
                parte: "cabeza",
                probabilidad: 50,
                vida: 80,
                defensa: 2
            },
            {
                parte: "torso",
                probabilidad: 50,
                vida: 80,
                defensa: 5
            },
            {
                parte: "brazo",
                lado: "derecho",
                probabilidad: 25,
                vida: 100,
                defensa: 10
            },
            {
                parte: "brazo",
                lado: "izquierdo",
                probabilidad: 23,
                vida: 100,
                defensa: 10
            },
            {
                parte: "pierna",
                lado: "derecha",
                probabilidad: 40,
                vida: 45,
                defensa: 3
            },
            {
                parte: "pierna",
                lado: "izquierda",
                probabilidad: 40,
                vida: 35,
                defensa: 3
            }
        ],
        recompensas: [
            {
                id_recurso: 2,
                cantidadMin: 1,
                cantidadMax: 3,
                probabilidad: 80
            }
        ]
    }
];


export const cantidadEnemigos = ObjetosEnemigos.crearEnemigo(enemigos)