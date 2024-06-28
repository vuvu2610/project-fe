export interface Product {
    id: number;
    image: string;
    title: string;
    rating: number;
    price: number;
    purchase: number;
    category: string;
    date: string;
}

export interface ChatHistory {
    role: string; content: string; 
}