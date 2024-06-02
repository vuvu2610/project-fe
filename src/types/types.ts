export interface Product {
    id: number;
    image: string;
    title: string;
    rating: {
        rate: number;
    };
    price: number;
}