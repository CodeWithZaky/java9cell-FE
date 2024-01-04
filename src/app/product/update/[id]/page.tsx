"use client";
import { Button } from "@/components/ui/button";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/types/session";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UpdateProduct = ({ params }: { params: { id: string } }) => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [images, setImages] = useState<any>("");
    const [price, setPrice] = useState<number>();
    const [stock, setStock] = useState<number>();
    const [categoryId, setCategoryId] = useState<number>(3);

    const data = useSession();
    const router = useRouter();

    const { toast } = useToast();

    const { data: session } = data;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.id}`
                );

                if (response.ok) {
                    const dataResponse = await response.json();
                    const { title, description, images, price, stock } =
                        dataResponse;
                    setTitle(title);
                    setDescription(description);
                    setImages(images.join(","));
                    setPrice(Number(price));
                    setStock(Number(stock));
                } else {
                    console.error(
                        "Gagal memuat produk. Status:",
                        response.status,
                        response.statusText
                    );
                    toast({
                        variant: "destructive",
                        title: "Gagal memuat produk. Cobalagi!",
                    });
                    const errorData = await response.json();
                    console.error("Informasi tambahan:", errorData);
                }
            } catch (error) {
                console.error("Terjadi kesalahan:", error);
            }
        };
        fetchData();
    }, [params.id, toast]);

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
                toast({
                    variant: "destructive",
                    title: "Token akses tidak tersedia. Silahkan login ulang!",
                });
                return;
            }
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                }
            );
            if (response.ok) {
                toast({
                    title: "Produk berhasil diupdate!",
                });
                router.push("/users/dashboard");
            } else {
                console.error(
                    "Gagal membuat produk. Status:",
                    response.status,
                    response.statusText
                );
                toast({
                    variant: "destructive",
                    title: "Gagal memperbarui produk. Cobalagi!",
                });
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
                        defaultValue={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </FormItem>

                <FormItem>
                    <Label>Price</Label>
                    <Input
                        placeholder="price..."
                        defaultValue={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />
                </FormItem>
                <FormItem>
                    <Label>Stock</Label>
                    <Input
                        placeholder="stock..."
                        defaultValue={stock}
                        onChange={(e) => setStock(Number(e.target.value))}
                    />
                </FormItem>
                <FormItem>
                    <Label>Description</Label>
                    <Textarea
                        placeholder="Description..."
                        className="resize-none"
                        defaultValue={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormItem>
                <Button onClick={onSubmit}>Update</Button>
            </div>
        </div>
    );
};

export default UpdateProduct;
