"use client";

import * as React from "react";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const deliveryServices = [
    {
        value: "j&t",
        label: "J&T",
    },
    {
        value: "pos",
        label: "POS",
    },
];

export function ComboboxDeliveryService() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("j&t");
    const router = useRouter();
    const searchParams = useSearchParams();

    const quantity = searchParams.get("totalQuantity");
    const deliveryService = searchParams.get("deliveryService");
    const payMethod = searchParams.get("paymentMethod");

    // Tambahkan parameter baru ke URL
    console.log(value);

    useEffect(() => {
        router.push(
            `?totalQuantity=${quantity}&deliveryService=${
                value == "j&t" ? "jandt" : "pos"
            }&paymentMethod=${payMethod}`
        );
    }, [payMethod, quantity, router, value]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between bg-primary"
                >
                    {value
                        ? deliveryServices.find(
                              (deliveryService) =>
                                  deliveryService.value === value
                          )?.label
                        : deliveryService?.toUpperCase()}
                    <ChevronDownIcon className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Search ..." className="h-9" />
                    <CommandEmpty>No deliveryService found.</CommandEmpty>
                    <CommandGroup>
                        {deliveryServices.map((deliveryService) => (
                            <CommandItem
                                key={deliveryService.value}
                                value={deliveryService.value}
                                onSelect={(currentValue) => {
                                    setValue(
                                        currentValue === value
                                            ? ""
                                            : currentValue
                                    );
                                    setOpen(false);
                                }}
                            >
                                {deliveryService.label}
                                <CheckIcon
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        value === deliveryService.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                    )}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
