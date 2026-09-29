export const nivelesEstructuras = {
    casa: {
        0: {
            nivel: 0,
            tiempo_construccion: 6000,
            recursos: [
                { id_recurso: 1, cantidad: 3 },
                { id_recurso: 2, cantidad: 4 }
            ],
            imagen: "src/img/estructuras/vacio.png",

        },
        1: {
            tiempo_construccion: 60,
            recursos: [
                { id_recurso: 11, cantidad: 50 },
                { id_recurso: 12, cantidad: 20 }
            ],
            imagen: "src/img/estructuras/casa-1.webp",
        },
        2: {
            tiempo_construccion: 120,
            recursos: [
                { id_recurso: 1, cantidad: 1 },
                { id_recurso: 2, cantidad: 1 },
                { id_recurso: 12, cantidad: 1 },
                { id_material: 2, cantidad: 1 }

            ],
            imagen: "src/img/estructuras/casa-1.webp",
        }
    },
    cocina: {
        0: {
            nivel: 0,
            tiempo_construccion: 6000,
            recursos: [
                { id_recurso: 1, cantidad: 50 },
                { id_recurso: 2, cantidad: 20 }
            ],
            imagen: "src/img/estructuras/vacio.png",

        },
        1: {
            tiempo_construccion: 30,
            recursos: [
                { id_recurso: 1, cantidad: 20 },
                { id_recurso: 2, cantidad: 30 }
            ]
        }
    }
}


export const estructurasNiveles = [
    {
        id_estructura: "casa", // Usamos texto como ID
        nombre: "Casa Principal",
        descripcion: "El lugar de descanso para tus personajes.",
        // Los niveles los guardamos en un array (la posición 0 es el nivel 0, etc.)
        niveles: [
            {
                nivel: 0,
                tiempo_construccion: 6000,
                recursos: [
                    { id_recurso: 1, cantidad: 3 },
                    { id_recurso: 2, cantidad: 4 }
                ],
                imagen: "src/img/estructuras/vacio.png",
            },
            {
                nivel: 1,
                tiempo_construccion: 60,
                recursos: [
                    { id_recurso: 11, cantidad: 50 },
                    { id_recurso: 12, cantidad: 20 }
                ],
                imagen: "src/img/estructuras/casa-1.webp",
            },
            {
                nivel: 2,
                tiempo_construccion: 120,
                recursos: [
                    { id_recurso: 1, cantidad: 1 },
                    { id_recurso: 2, cantidad: 1 },
                    { id_recurso: 12, cantidad: 1 },
                    { id_material: 2, cantidad: 1 }
                ],
                imagen: "src/img/estructuras/casa-2.webp",
            }
        ]
    },
    {
        id_estructura: "cocina",
        nombre: "Cocina de Campaña",
        descripcion: "Permite cocinar alimentos para mejorar la energía.",
        niveles: [
            {
                nivel: 0,
                tiempo_construccion: 6000,
                recursos: [
                    { id_recurso: 1, cantidad: 50 },
                    { id_recurso: 2, cantidad: 20 }
                ],
                imagen: "src/img/estructuras/vacio.png",
            },
            {
                nivel: 1,
                tiempo_construccion: 30,
                recursos: [
                    { id_recurso: 1, cantidad: 20 },
                    { id_recurso: 2, cantidad: 30 }
                ],
                imagen: "src/img/estructuras/cocina-1.webp",
            }
        ]
    }
];

