"use client";
import useProductData from "@/hooks/useProductData";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Product } from "@/types/products";
import Link from "next/link";
import { Label } from "../ui/label";

const CardProduct = () => {
    const { products: prod, loading: load, error: err } = useProductData();

    if (load) {
        return <div>Loading...</div>;
    }

    if (err) {
        return <div>Error: {err}</div>;
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {prod.map((product: Product, index: number) => {
                const img = product.images.join(",");

                const numberFormat = (value: any) =>
                    new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                    }).format(value);

                return (
                    <Fragment key={index}>
                        <Card className="flex flex-col justify-between">
                            <CardHeader>
                                <div className="relative aspect-square w-full bg-background rounded-lg">
                                    <Image
                                        src={img}
                                        alt={product.title}
                                        className="absolute w-full h-full rounded-lg"
                                        width={500}
                                        height={500}
                                        objectFit="cover"
                                    />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Label>{product.title}</Label>
                                <CardDescription className="whitespace-wrap">
                                    {product.description}
                                </CardDescription>
                                <CardTitle className="mt-4 whitespace-wrap">
                                    {numberFormat(product.price)}
                                </CardTitle>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline">
                                    <Link
                                        href={`/product/detail/${product.id}`}
                                    >
                                        Detail
                                    </Link>
                                </Button>
                                <Button>
                                    <Link href={`/buy/${product.id}`}>Buy</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </Fragment>
                );
            })}
        </div>
    );
};

export default CardProduct;
