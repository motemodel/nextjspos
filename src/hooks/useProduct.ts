import { useQuery } from "@tanstack/react-query";
import { fetchAllProduct } from "@/services/product-service";
import { ProductBackend } from "@/types/product-type";
import { AxiosError } from "axios";

type ProductErrorResponse = {
    message: string;
}

export default function UseProduct() {
    const { data, isFetching, error } = useQuery<ProductBackend[], AxiosError<ProductErrorResponse>>({
        queryKey: ["ProductData"],
        queryFn: fetchAllProduct,
        //refetchInterval: 5000,
        retry: 3,
        refetchOnWindowFocus: true,
    });

    return {
        products: data,
        loading: isFetching,
        error: error?.response?.data.message
    }
}