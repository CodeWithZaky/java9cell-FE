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

const DetailProduct = ({ params }: { params: { id: string } }) => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [images, setImages] = useState<any>();
    const [price, setPrice] = useState<number>(0);
    const [stock, setStock] = useState<number>(0);
    const { toast } = useToast();
    const { numberFormat } = usePriceFormat();

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

    return (
        <Card className="flex flex-col md:flex-row w-[80%] mx-auto mt-10">
            <CardHeader>
                <div className="relative aspect-square h-[200px] w-[200px] sm:h-[400px] sm:w-[400px] md:h-[200px] md:w-[200px] lg:h-[400px] lg:w-[400px] bg-background rounded-lg">
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
            <div className="flex flex-col my-5 h-full justify-between items-start">
                <CardContent className="flex flex-col gap-5">
                    <Label className="text-xl">{title}</Label>
                    <div className="flex flex-col">
                        <p className="text-foreground">{"Description: "}</p>
                        <CardDescription className="whitespace-wrap mt-2">
                            {description}
                        </CardDescription>
                    </div>
                    <CardDescription className="whitespace-wrap font-bold text-primary mt-2">
                        {`stock: ${stock}`}
                    </CardDescription>
                    <div className="flex flex-col">
                        <p className="text-foreground">{"Price: "}</p>
                        <CardTitle className="whitespace-wrap mt-2">
                            {numberFormat(price)}
                        </CardTitle>
                    </div>
                </CardContent>
                <CardFooter>
                    <Link href={`/buy/${params.id}`}>
                        <Button className="px-5">Buy</Button>
                    </Link>
                </CardFooter>
            </div>
        </Card>
    );
};

export default DetailProduct;
