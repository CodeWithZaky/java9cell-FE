"use client";
import { useEffect, useState } from "react";
import { Product } from "@/types/products";

const useGetOrders = () => {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/orders`
                );

                if (response.ok) {
                    const dataResponse = await response.json();
                    setData(dataResponse);
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
    }, []);

    return { data, loading, error };
};

export default useGetOrders;
