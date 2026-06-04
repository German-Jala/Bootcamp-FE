import { Car } from "./car";

export const CARS_MOCK: Car[] = [
    {
        id: 1,
        brand: "Tesla",
        model: "Model 3",
        year: 2023,
        color: "Blanco Perla",
        price: 41990,
        type: "Electric",
        imageUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80",
        available: true
    },
    {
        id: 2,
        brand: "Porsche",
        model: "911 Carrera",
        year: 2024,
        color: "Gris Metálico",
        price: 114400,
        type: "Sports",
        imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
        available: true
    },
    {
        id: 3,
        brand: "Toyota",
        model: "RAV4",
        year: 2022,
        color: "Azul Eléctrico",
        price: 28500,
        type: "SUV",
        imageUrl: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80",
        available: false
    },
    {
        id: 4,
        brand: "Audi",
        model: "A4",
        year: 2023,
        color: "Negro Mito",
        price: 40300,
        type: "Sedan",
        imageUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80",
        available: true
    },
    {
        id: 5,
        brand: "Ford",
        model: "Mustang Mach-E",
        year: 2023,
        color: "Rojo Rápido",
        price: 43000,
        type: "Electric",
        imageUrl: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=800&q=80",
        available: true
    }
];
