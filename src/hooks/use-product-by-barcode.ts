import { useQuery } from "@tanstack/react-query";
import { fetchProductByBarcode } from "@/services/product-service";
import { ProductBackend } from "@/types/product-type";
import { AxiosError } from "axios";

type ProductErrorResponse = {
    message: string;
}

export function useProductByBarcode(barcode: string, enabled = true) {
    return useQuery<ProductBackend, AxiosError<ProductErrorResponse>>({
        queryKey: ["ProductDataBarcode", barcode],
        queryFn: () => fetchProductByBarcode(barcode),
        enabled: enabled && barcode.length > 0,
        retry: 2,
        refetchOnWindowFocus: true,
    });
}