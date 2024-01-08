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

const paymentMethods = [
    {
        value: "bri",
        label: "BRI",
    },
    {
        value: "dana",
        label: "DANA",
    },
];

export function PaymentMethodCombobox() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("bri");
    const router = useRouter();
    const searchParams = useSearchParams();

    const quantity = searchParams.get("totalQuantity");
    const payMethod = searchParams.get("paymentMethod");

    // Tambahkan parameter baru ke URL
    useEffect(() => {
        router.push(
            `?totalQuantity=${quantity}&deliveryService=${
                value == "j&t" ? "jandt" : "pos"
            }&paymentMethod=${value ? value : "bri"}`
        );
    }, [quantity, router, value]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between bg-primary"
                >
                    {value
                        ? paymentMethods.find(
                              (paymentMethod) => paymentMethod.value === value
                          )?.label
                        : payMethod?.toUpperCase()}
                    <ChevronDownIcon className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Search ..." className="h-9" />
                    <CommandEmpty>No paymentMethod found.</CommandEmpty>
                    <CommandGroup>
                        {paymentMethods.map((paymentMethod) => (
                            <CommandItem
                                key={paymentMethod.value}
                                value={paymentMethod.value}
                                onSelect={(currentValue) => {
                                    setValue(
                                        currentValue === value
                                            ? ""
                                            : currentValue
                                    );
                                    setOpen(false);
                                }}
                            >
                                {paymentMethod.label}
                                <CheckIcon
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        value === paymentMethod.value
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
