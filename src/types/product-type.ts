export interface ProductBackend {
    id: number;
    barcode: string;
    name: string;
    description: string | null;
    price: string;
    cost: string;
    stock: number;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
    category: ProductCategory;
}

export interface ProductCategory {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
