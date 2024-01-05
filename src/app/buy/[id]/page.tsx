"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import usePriceFormat from "@/hooks/usePriceFormat";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

const Buy = ({ params }: { params: { id: string } }) => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [images, setImages] = useState<any>();
    const [price, setPrice] = useState<number>(0);
    const [stock, setStock] = useState<number>(0);
    const { toast } = useToast();
    const { numberFormat } = usePriceFormat();
    const router = useRouter();

    const searchParams = useSearchParams();

    const totalQuantity = searchParams.get("quantity");
    const [quantity, setQuantity] = useState<number>(
        Number(Number(totalQuantity) < 1 ? 1 : Number(totalQuantity))
    );

    useEffect(() => {
        router.push(`?quantity=${quantity}`);
    }, [router, quantity, totalQuantity, stock]);

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

    const onQuantity = (t: string) => {
        if (t == "plus") {
            if (quantity >= stock) {
                setQuantity(quantity);
            } else {
                setQuantity(quantity + 1);
            }
        }
        if (t == "min") {
            if (quantity <= 1) {
                setQuantity(quantity);
            } else {
                setQuantity(quantity - 1);
            }
        }
    };

    return (
        <div className="flex  gap-3 w-full md:w-[70%] mx-auto mt-10">
            <Card className="flex w-[70%]">
                <CardHeader>
                    <div className="relative aspect-square h-[150px] w-[150px]   bg-background rounded-lg">
                        <Image
                            src={images}
                            alt={title}
                            className="absolute w-full h-full rounded-lg"
                            width={500}
                            height={500}
                            objectFit="cover"
                        />
                    </div>
                </CardHeader>
                <div className="flex flex-col my-5">
                    <CardContent>
                        <Label className="text-xl">{title}</Label>
                        <CardDescription className="whitespace-wrap mt-2">
                            {description}
                        </CardDescription>
                        <CardDescription className="whitespace-wrap font-bold text-primary mt-2">
                            {`stock: ${stock}`}
                        </CardDescription>
                        <CardTitle className="mt-4 whitespace-wrap">
                            {numberFormat(price)}
                        </CardTitle>
                    </CardContent>
                    <CardFooter className="flex justify-start gap-5"></CardFooter>
                </div>
            </Card>
            <Card className="flex flex-col gap-5 p-5 w-[30%]">
                <Label className="text-xl">Pembelian</Label>
                <div className="flex flex-col gap-2">
                    <CardDescription>{`Total Pembelian : `}</CardDescription>
                    <CardTitle>{`${numberFormat(
                        Number(totalQuantity) * price
                    )}`}</CardTitle>
                </div>
                <div className="inline-flex gap-5 mt-2">
                    <Button size={"sm"} onClick={() => onQuantity("min")}>
                        -
                    </Button>
                    <p className="flex justify-center items-center h-full">
                        {totalQuantity}
                    </p>
                    <Button size={"sm"} onClick={() => onQuantity("plus")}>
                        +
                    </Button>
                </div>
                {quantity == stock ? (
                    <CardDescription className="text-yellow-500 dark:text-yellow-200 flex items-end gap-2">
                        <AlertTriangle />
                        <span>yakin, membeli semua stock</span>
                    </CardDescription>
                ) : null}
                <Link
                    href={`/buy/payment/${params.id}?totalQuantity=${totalQuantity}`}
                >
                    <Button
                        size={"sm"}
                        disabled={Number(totalQuantity) == 0 ? true : false}
                    >
                        PESAN
                    </Button>
                </Link>
            </Card>
        </div>
    );
};

export default Buy;
