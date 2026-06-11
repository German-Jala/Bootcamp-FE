import { Product } from "../models/product";

export const productList: Product[] = ([
    {
        id: 1,
        title: 'Fjallraven - Backpack',
        price: 109.95,
        elements: ['banana', 'manzana'],
        description: 'Your perfect pack for everyday use and walks in the park. Fits 15 laptops in the padded sleeve, your everyday will be protected.',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400&auto=format&fit=crop'
    },
    {
        id: 2,
        title: 'Mens Casual T-Shirt',
        price: 22.30,
        elements: ['banana'],
        description: 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & comfortable fabric for breathable clothes.',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=400&auto=format&fit=crop'
    },
    {
        id: 3,
        title: 'Mens Cotton Jacket',
        price: 55.99,
        elements: [],
        description: 'Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing.',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400&auto=format&fit=crop'
    },
    {
        id: 4,
        title: 'Solid Gold Petite Ring',
        price: 168.00,
        elements: ['banana', 'manzana', 'sandia'],
        description: 'Satisfaction Guaranteed. Return or exchange any order within 30 days. Designed and manufactured by Hand Made Jewelry.',
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400&auto=format&fit=crop'
    },
    {
        id: 5,
        title: 'Casual Ring',
        price: 9.99,
        elements: ['banana'],
        description: 'Nice ring.',
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=400&auto=format&fit=crop'
    }
]);