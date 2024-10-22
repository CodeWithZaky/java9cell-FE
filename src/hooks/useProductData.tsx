"use client";
import { useEffect, useState } from "react";
import { Product } from "@/types/products";
import { useSearchParams } from "next/navigation";
import { axiosInstance } from "@/lib/axosInstance";

const useProductData = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState<string>("");

    const searchParams = useSearchParams();
    const queryParams = searchParams.get("search");

    console.log("search", search);

    useEffect(() => {
        setSearch(queryParams || "");
    }, [queryParams]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/products${
                        search &&
                        search !== "" &&
                        search !== null &&
                        search !== undefined
                            ? `?search=${search}`
                            : ""
                    }`
                );

                if (response.ok) {
                    const dataResponse = await response.json();
                    const data = dataResponse.products;
                    setProducts(data);
                    setLoading(false);
                    console.log("Produk berhasil dimuat!");
                } else {
                    setError(
                        `Gagal memuat produk. Status: ${response.status}, ${response.statusText}`
                    );
                    setLoading(false);
                    const errorData = await response.json();
                    console.error("Informasi tambahan:", errorData);
                }
            } catch (error) {
                setError(`Terjadi kesalahan: ${error}`);
                setLoading(false);
                console.error("Terjadi kesalahan:", error);
            }
        };

        fetchData();

        //const getAllProducts = axiosInstance.get("/products");
    }, [search]);

    return { products, loading, error };
};

export default useProductData;

// const getProducts = async () => {
//     try {
//         const response = await fetch(
//             `${process.env.NEXT_PUBLIC_API_URL}/api/products`
//         );

//         if (response.ok) {
//             const dataResponse = await response.json();
//             const data = dataResponse.products;
//             return data;
//         } else {
//             const errorData = await response.json();
//             return errorData;
//         }
//     } catch (error) {
//         return error;
//     }
// };

// export default getProducts;
