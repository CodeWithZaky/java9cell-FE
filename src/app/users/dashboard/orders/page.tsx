"use client";
import Loading from "@/components/loading";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import useGetOrders from "@/hooks/useGetOrders";
import React, { Fragment } from "react";

const OrdersDashboard = () => {
    const { data, loading, error } = useGetOrders();

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="space-y-5 w-[90%] mx-auto mt-10">
            {data.map((item: any, index: number) => {
                return (
                    <div className="flex flex-col" key={index}>
                        <Button
                            variant={"outline"}
                            className="w-fit bg-secondary"
                        >
                            {index + 1}
                        </Button>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>{`Pesanan ${
                                    index + 1
                                }`}</AccordionTrigger>
                                <AccordionContent className="space-y-5">
                                    <div className="flex">
                                        <p className="w-[20%]">Alamat :</p>
                                        <div className="w-[80%]">
                                            <p>{item.shippingAddress.name}</p>
                                            <p>{item.shippingAddress.phone}</p>
                                            <p>
                                                {item.shippingAddress.address}
                                            </p>
                                            <p>{item.shippingAddress.city}</p>
                                            <p>{item.shippingAddress.state}</p>
                                            <p>
                                                {item.shippingAddress.country}
                                            </p>
                                            <p>
                                                {item.shippingAddress.postCode}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <p className="w-[20%]">
                                            produk pesanan :
                                        </p>
                                        <div className="w-[80%]">
                                            {item.products.map(
                                                (product: any) => {
                                                    return (
                                                        <Fragment
                                                            key={product.id}
                                                        >
                                                            <p>{product.id}</p>
                                                            <p>
                                                                {product.title}
                                                            </p>
                                                            <p>
                                                                {
                                                                    product.courier
                                                                }
                                                            </p>
                                                            <p>
                                                                {
                                                                    product.payment_method
                                                                }
                                                            </p>
                                                            <p>
                                                                {
                                                                    product.product_unit_price
                                                                }
                                                            </p>
                                                            <p>
                                                                {
                                                                    product.product_quantity
                                                                }
                                                            </p>
                                                        </Fragment>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                );
            })}
        </div>
    );
};

export default OrdersDashboard;
