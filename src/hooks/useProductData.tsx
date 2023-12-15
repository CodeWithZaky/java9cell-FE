"use client";
import { useEffect, useState } from "react";
import { Product } from "@/types/products";

const useProductData = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/products`
            );

            if (response.ok) {
                const dataResponse = await response.json();
                const data = dataResponse.products;
                setProducts(data);
                setLoading(false);
                console.log("Produk berhasil dibuat!");
            } else {
                setError(
                    `Gagal membuat produk. Status: ${response.status}, ${response.statusText}`
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

    useEffect(() => {
        fetchData();
    }, []);

    return { products, loading, error };
};

export default useProductData;
