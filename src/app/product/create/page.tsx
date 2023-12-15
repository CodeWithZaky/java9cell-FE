"use client";

import { Button } from "@/components/ui/button";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User } from "@/types/session";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateProduct = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [images, setImages] = useState<any>("");
    const [price, setPrice] = useState<number>(0);
    const [stock, setStock] = useState<number>(0);
    const [categoryId, setCategoryId] = useState<number>(3);

    const data = useSession();
    const router = useRouter();

    if (data.status === "unauthenticated") {
        router.push("/auth/login");
    }
    const { data: session } = data;

    const onSubmit = async () => {
        try {
            const data = {
                title,
                description,
                images: [images],
                price,
                stock,
                categoryId,
            };
            const token = (session?.user as User)?.accessToken;
            if (!token) {
                console.error("Token akses tidak tersedia.");
                return;
            }
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                }
            );
            if (response.ok) {
                console.log("Produk berhasil dibuat!");
                router.push("/users/dashboard");
            } else {
                console.error(
                    "Gagal membuat produk. Status:",
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

    const onImageUpload = (e: any) => {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImages(reader.result);
        };
        reader.onerror = function (error) {
            console.log("Error: ", error);
        };
    };
    return (
        <div className="flex flex-col md:flex-row gap-0 md:gap-4 w-full md:w-[80%] mx-auto pt-10">
            <FormItem className="w-full md:w-2/4 flex flex-col gap-4">
                <Label>Image</Label>
                {images ? (
                    <Image src={images} width={300} height={300} alt="image" />
                ) : (
                    <div className="h-[300px] w-[300px] bg-card" />
                )}
                <input type="file" onChange={onImageUpload} />
            </FormItem>

            <div className="flex flex-col w-full md:w-2/4 gap-4">
                <FormItem>
                    <Label>Title</Label>
                    <Input
                        placeholder="title..."
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </FormItem>

                <FormItem>
                    <Label>Price</Label>
                    <Input
                        placeholder="price..."
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />
                </FormItem>
                <FormItem>
                    <Label>Stock</Label>
                    <Input
                        placeholder="stock..."
                        onChange={(e) => setStock(Number(e.target.value))}
                    />
                </FormItem>
                <FormItem>
                    <Label>Description</Label>
                    <Textarea
                        placeholder="Description..."
                        className="resize-none"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormItem>
                <Button onClick={onSubmit}>Create</Button>
            </div>
        </div>
    );
};

export default CreateProduct;
