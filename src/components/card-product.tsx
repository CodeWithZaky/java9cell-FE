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
import { Label } from "./ui/label";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import usePriceFormat from "@/hooks/usePriceFormat";
import Loading from "./loading";

const CardProduct = () => {
    const { products: prod, loading: load, error: err } = useProductData();
    const { numberFormat } = usePriceFormat();

    if (load) {
        return <Loading />;
    }

    if (err) {
        return (
            <div>
                <span className="text-destructive">Error:</span>{" "}
                <span className="text-foreground">{err}</span>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {prod.map((product: Product, index: number) => {
                const img = product.images.join(",");

                return (
                    <Fragment key={index}>
                        <Card className="flex flex-col justify-between transition-all">
                            <div>
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
                                    <HoverCard>
                                        <HoverCardTrigger>
                                            <Label className="whitespace-wrap mt-2">
                                                {product.title.length > 20
                                                    ? product.description.slice(
                                                          0,
                                                          20
                                                      ) + "..."
                                                    : product.title}
                                            </Label>
                                            <HoverCardContent>
                                                {product.description}
                                            </HoverCardContent>
                                        </HoverCardTrigger>
                                    </HoverCard>
                                    <HoverCard>
                                        <HoverCardTrigger>
                                            <CardDescription className="whitespace-wrap mt-2">
                                                {product.description.length > 50
                                                    ? product.description.slice(
                                                          0,
                                                          50
                                                      ) + "..."
                                                    : product.description}
                                            </CardDescription>
                                            <HoverCardContent>
                                                {product.description}
                                            </HoverCardContent>
                                        </HoverCardTrigger>
                                    </HoverCard>
                                    <CardDescription className="whitespace-wrap mt-2 text-foreground/80">
                                        {`stock: ${product.stock}`}
                                    </CardDescription>
                                </CardContent>
                            </div>
                            <CardFooter className="flex flex-col w-full justify-start items-start gap-2">
                                <CardTitle className="mt-4 whitespace-wrap text-xl">
                                    {numberFormat(product.price)}
                                </CardTitle>
                                <div className="flex justify-between w-full">
                                    <Link
                                        href={`/product/detail/${product.id}`}
                                    >
                                        <Button variant="outline">
                                            Detail
                                        </Button>
                                    </Link>
                                    <Link href={`/buy/${product.id}`}>
                                        <Button>Buy</Button>
                                    </Link>
                                </div>
                            </CardFooter>
                        </Card>
                    </Fragment>
                );
            })}
        </div>
    );
};

export default CardProduct;
