import { ProductBackend } from "@/types/product-type";
import axios from "axios";

export async function fetchAllProduct() {
    const response = await axios.get<ProductBackend[]>("https://backend.codingthailand.com/v2/products");
    return response.data;
}

export async function fetchProductByBarcode(barcode: string) {
    const response = await axios.get<ProductBackend>(`https://backend.codingthailand.com/v2/products/barcode/${barcode}`);
    return response.data;
}