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
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import usePriceFormat from "@/hooks/usePriceFormat";
import { useSearchParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import Link from "next/link";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import ProductDescAccordion from "@/components/layouts/product-desc-accordion";
import { Label } from "@radix-ui/react-dropdown-menu";
import { ComboboxDeliveryService } from "@/components/layouts/combobox";
import { PaymentMethodCombobox } from "@/components/layouts/payment-method-combobox";
import { Input } from "@/components/ui/input";
import { FormItem } from "@/components/ui/form";

const Payment = ({ params }: { params: { id: string } }) => {
    const { toast } = useToast();
    const { numberFormat } = usePriceFormat();
    const [cutDeliveryServices, setCutDeliveryServices] = useState<Number>(0);

    // products state
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [images, setImages] = useState<any>("");

    //address state
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [postCode, setPostCode] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [country, setCountry] = useState<string>("");

    // url params
    const searchParams = useSearchParams();
    const totalQuantity = searchParams.get("totalQuantity");
    const deliveryService = searchParams.get("deliveryService");
    const paymentMethod = searchParams.get("paymentMethod");
    const allUrl = `${window.location.href}`.toString();

    useEffect(() => {
        if (deliveryService === "jandt") {
            setCutDeliveryServices(30000);
        } else if (deliveryService === "pos") {
            setCutDeliveryServices(20000);
        } else {
            setCutDeliveryServices(0);
        }
    }, [deliveryService]);

    //discount
    const diskon = 10;
    const [harga, setHarga] = useState(0);

    useEffect(() => {
        const totprice = Number(totalQuantity) * price;
        const totDsikon = totprice - (totprice * diskon) / 100;
        setHarga(totDsikon);
    }, [price, totalQuantity]);

    //fetch product by id
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.id}`
                );

                if (response.ok) {
                    const dataResponse = await response.json();
                    const { title, description, price, images } = dataResponse;
                    setTitle(title);
                    setImages(images.join(","));
                    setDescription(description);
                    setPrice(Number(price));
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

    // getter and setter localstorage data
    useEffect(() => {
        const storedName = localStorage.getItem("name");
        const storedPhone = localStorage.getItem("phone");
        const storedAddress = localStorage.getItem("address");
        const storedCity = localStorage.getItem("city");
        const storedPostCode = localStorage.getItem("postCode");
        const storedState = localStorage.getItem("state");
        const storedCountry = localStorage.getItem("country");

        if (storedName) setName(storedName);
        if (storedPhone) setPhone(storedPhone);
        if (storedAddress) setAddress(storedAddress);
        if (storedCity) setCity(storedCity);
        if (storedPostCode) setPostCode(storedPostCode);
        if (storedState) setState(storedState);
        if (storedCountry) setCountry(storedCountry);
    }, []);

    // Fungsi untuk menyimpan nilai ke localStorage setiap kali nilai berubah
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

    return (
        <div className="flex flex-col w-full md:w-[90%] mx-auto my-10 gap-5">
            {/* <Card className="w-full border border-yellow-300/80 text-yellow-300/80 flex flex-col items-center py-2">
                <AlertTriangle />
                <p>MOHON MAAF!</p>
                <p>UNTUK SISTEM PEMESANAN DALAM APLIKASI</p>
                <p>BELUM TERSEDIA,</p>
                <p>SILAHKAN PILIH SISTEM PEMESANAN YANG TERSEDIA</p>
            </Card> */}
            <Label className="text-xl">Check out</Label>
            <div className="flex flex-col whitespace-wrap w-[70%] text-muted-foreground">
                <p>
                    <span className="italic">catatan</span>
                    {` : nota bisa di screenshot untuk nanti di gunakan untuk
                    proses pemesanan `}
                    <Dialog>
                        <DialogTrigger className="w-fit text-foreground italic border rounded-md px-2">
                            CEK NOTA
                        </DialogTrigger>
                        <DialogContent>
                            <CardHeader>
                                <CardTitle>NOTA</CardTitle>
                                <div className="bg-white p-2 w-fit rounded-lg">
                                    <QRCodeCanvas value={allUrl} />
                                </div>
                            </CardHeader>
                            <CardContent className="flex flex-col items-start gap-2">
                                <CardDescription className="whitespace-wrap w-full flex justify-between">
                                    <p className="w-[50%]">barang</p>
                                    <p className="w-[50%]">{`: ${title}`}</p>
                                </CardDescription>
                                <CardDescription className="whitespace-wrap w-full flex justify-between">
                                    <p className="w-[50%]">Jasa Pengiriman</p>
                                    <p className="w-[50%]">{`: ${
                                        deliveryService == "jandt"
                                            ? "J&T"
                                            : deliveryService
                                    }`}</p>
                                </CardDescription>
                                <CardDescription className="whitespace-wrap w-full flex justify-between">
                                    <p className="w-[50%]">Metode Pembayaran</p>
                                    <p className="w-[50%] uppercase">{`: ${paymentMethod}`}</p>
                                </CardDescription>
                                <CardDescription className="whitespace-wrap w-full flex justify-between">
                                    <p className="w-[50%]">
                                        {`Total Harga (${totalQuantity} produk)`}
                                    </p>
                                    <p className="w-[50%]">{`: ${numberFormat(
                                        Number(totalQuantity) * price
                                    )}`}</p>
                                </CardDescription>
                                <CardDescription className="whitespace-wrap w-full flex justify-between">
                                    <p className="w-[50%]">
                                        Total Ongkos Kirim
                                    </p>
                                    <p className="w-[50%]">{`: ${numberFormat(
                                        cutDeliveryServices
                                    )}`}</p>
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="flex flex-col items-start gap-3">
                                <div className="flex w-full justify-between">
                                    <CardDescription className="w-[50%] text-foreground font-bold text-lg">
                                        Total Belanja
                                    </CardDescription>
                                    <CardDescription className="w-[50%] text-foreground font-bold text-lg">{`: ${numberFormat(
                                        Number(totalQuantity) * price +
                                            Number(cutDeliveryServices)
                                    )}`}</CardDescription>
                                </div>
                            </CardFooter>
                        </DialogContent>
                    </Dialog>
                </p>
            </div>
            <div className="flex gap-3">
                <div className="w-[60%] space-y-3">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between">
                                <CardTitle>Alamat pengiriman</CardTitle>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">
                                            Edit Alamat
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[70%]">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Edit alamat
                                            </DialogTitle>
                                        </DialogHeader>
                                        <div className="flex gap-5">
                                            <div className="w-[50%] space-y-3">
                                                <FormItem>
                                                    <Label>Name</Label>
                                                    <Input
                                                        placeholder={
                                                            name
                                                                ? name
                                                                : "name..."
                                                        }
                                                        onChange={(e) =>
                                                            setName(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </FormItem>
                                                <FormItem>
                                                    <Label>Phone</Label>
                                                    <Input
                                                        placeholder={
                                                            phone
                                                                ? phone
                                                                : "phone..."
                                                        }
                                                        onChange={(e) =>
                                                            setPhone(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </FormItem>
                                                <FormItem>
                                                    <Label>Address</Label>
                                                    <Input
                                                        placeholder={
                                                            address
                                                                ? address
                                                                : "address..."
                                                        }
                                                        onChange={(e) =>
                                                            setAddress(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </FormItem>
                                                <FormItem>
                                                    <Label>City</Label>
                                                    <Input
                                                        placeholder={
                                                            city
                                                                ? city
                                                                : "city..."
                                                        }
                                                        onChange={(e) =>
                                                            setCity(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </FormItem>
                                            </div>
                                            <div className="w-[50%] space-y-3">
                                                <FormItem>
                                                    <Label>Post Code</Label>
                                                    <Input
                                                        placeholder={
                                                            postCode
                                                                ? postCode
                                                                : "post code..."
                                                        }
                                                        onChange={(e) =>
                                                            setPostCode(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </FormItem>
                                                <FormItem>
                                                    <Label>State</Label>
                                                    <Input
                                                        placeholder={
                                                            state
                                                                ? state
                                                                : "state..."
                                                        }
                                                        onChange={(e) =>
                                                            setState(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </FormItem>
                                                <FormItem>
                                                    <Label>Country</Label>
                                                    <Input
                                                        placeholder={
                                                            country
                                                                ? country
                                                                : "country..."
                                                        }
                                                        onChange={(e) =>
                                                            setCountry(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </FormItem>
                                            </div>
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
                            </div>
                            <CardDescription>
                                <CardTitle className="text-xl">{`${name} (Rumah)`}</CardTitle>
                                <Label>{phone}</Label>
                                <CardDescription>{address}</CardDescription>
                                <CardDescription>{`${state}, ${country}, ${postCode}`}</CardDescription>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>DATA PESANAN</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-row justify-between gap-5">
                            <div className="flex flex-col items-start gap-2 w-3/5">
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
                                <div className="w-full space-y-5">
                                    <CardDescription className="whitespace-wrap w-full flex flex-col justify-between">
                                        <p>barang :</p>
                                        <p>{title}</p>
                                    </CardDescription>
                                    <CardDescription className="whitespace-wrap w-full flex flex-col justify-between">
                                        <p>harga :</p>
                                        <p>{numberFormat(price)}</p>
                                    </CardDescription>
                                    <CardDescription className="whitespace-wrap w-full flex flex-col justify-between">
                                        <ProductDescAccordion
                                            desc={description}
                                        />
                                    </CardDescription>
                                </div>
                            </div>
                            <div className="w-2/5 flex flex-col justify-start items-end gap-2">
                                <div className="flex flex-col justify-start gap-2 w-full">
                                    <p className="px-1">Jasa Pengiriman :</p>
                                    <ComboboxDeliveryService />
                                </div>
                                <div className="flex flex-col justify-start gap-2 w-full">
                                    <p className="px-1">Metode Pembayaran :</p>
                                    <PaymentMethodCombobox />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <Card className="w-[40%] h-fit">
                    <CardHeader>
                        <CardTitle>Ringkasan belanja</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-start gap-2">
                        <CardDescription className="whitespace-wrap w-full flex justify-between">
                            <p className="w-[50%]">
                                {`Total Harga (${totalQuantity} produk)`}
                            </p>
                            <p className="w-[50%]">{`: ${numberFormat(
                                Number(totalQuantity) * price
                            )}`}</p>
                        </CardDescription>
                        <CardDescription className="whitespace-wrap w-full flex justify-between">
                            <p className="w-[50%]">Total Ongkos Kirim</p>
                            <p className="w-[50%]">{`: ${numberFormat(
                                cutDeliveryServices
                            )}`}</p>
                        </CardDescription>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start gap-3">
                        <div className="flex w-full justify-between mb-5">
                            <CardDescription className="w-[50%]">
                                Total Belanja
                            </CardDescription>
                            <CardDescription className="w-[50%]">{`: ${numberFormat(
                                Number(totalQuantity) * price +
                                    Number(cutDeliveryServices)
                            )}`}</CardDescription>
                        </div>
                        <Link
                            href={`https://wa.me/+6285608921729`}
                            className="w-full"
                            target="_blank"
                        >
                            <Button className="w-full bg-[#25D366]" size={"sm"}>
                                WhatsApp
                            </Button>
                        </Link>
                        <Link
                            href={`https://ig.me/m/muhammadar_20`}
                            className="w-full"
                            target="_blank"
                        >
                            <Button className="w-full bg-red-500" size={"sm"}>
                                Instagram
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default Payment;
