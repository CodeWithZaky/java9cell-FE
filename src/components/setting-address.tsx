import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { FormItem } from "@/components/ui/form";
import { Button } from "./ui/button";
import { useState } from "react";
import { Label } from "./ui/label";

const SettingAddress = () => {
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [postCode, setPostCode] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [country, setCountry] = useState<string>("");

    const saveToLocalStorage = (key: string, value: string) => {
        localStorage.setItem(key, value);
    };

    const onSubmitAddress = () => {
        saveToLocalStorage("name", name);
        saveToLocalStorage("phone", phone);
        saveToLocalStorage("address", address);
        saveToLocalStorage("city", city);
        saveToLocalStorage("postCode", postCode);
        saveToLocalStorage("state", state);
        saveToLocalStorage("country", country);
    };

    const form_items = [
        {
            label: "nama",
            placeholder: "name...",
            setter: setName,
        },
        {
            label: "phone",
            placeholder: "phone...",
            setter: setPhone,
        },
        {
            label: "Address",
            placeholder: "adsress...",
            setter: setAddress,
        },
        {
            label: "City",
            placeholder: "city...",
            setter: setCity,
        },
        {
            label: "Post Code",
            placeholder: "post code...",
            setter: setPostCode,
        },
        {
            label: "State",
            placeholder: "state...",
            setter: setState,
        },
        {
            label: "Country",
            placeholder: "country...",
            setter: setCountry,
        },
    ];

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Alamat</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[70%]">
                <DialogHeader>
                    <DialogTitle>Edit alamat</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 items-center justify-item-center w-full gap-3">
                    {form_items.map((item, index) => (
                        <FormItem key={index}>
                            <Label>{item.label}</Label>
                            <Input
                                placeholder={item.placeholder}
                                onChange={(e) => item.setter(e.target.value)}
                            />
                        </FormItem>
                    ))}
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            onClick={onSubmitAddress}
                            variant="default"
                        >
                            save changes
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SettingAddress;
