export interface Car {
    id: number;
    brand: string;
    model: string;
    year: number;
    color: string;
    price: number;
    type: 'Sedan' | 'SUV' | 'Sports' | 'Electric';
    imageUrl: string;
    available: boolean;
}
