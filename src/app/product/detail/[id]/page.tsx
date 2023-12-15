"use client";
import { useEffect, useState } from "react";

const DetailPeoduct = ({ params }: { params: { id: string } }) => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.id}`
                );

                if (response.ok) {
                    const dataResponse = await response.json();
                    const data = dataResponse;
                    setProducts(data);
                    console.log("Produk berhasil dimuat!");
                } else {
                    console.error(
                        "Gagal memuat produk. Status:",
                        response.status,
                        response.statusText
                    );
                    const errorData = await response.json();
                    console.error("Informasi tambahan:", errorData);
                }
            } catch (error) {
                console.error("Terjadi kesalahan:", error);
            }
        };
        fetchData();
    }, [params.id]);
    return <div>DetailPeoduct</div>;
};

export default DetailPeoduct;
