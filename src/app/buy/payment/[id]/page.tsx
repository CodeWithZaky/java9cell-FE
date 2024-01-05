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
import { AlertTriangle } from "lucide-react";
import usePriceFormat from "@/hooks/usePriceFormat";
import { useSearchParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const Payment = ({ params }: { params: { id: string } }) => {
    console.log(params.id);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const { toast } = useToast();
    const { numberFormat } = usePriceFormat();

    const searchParams = useSearchParams();
    const totalQuantity = searchParams.get("totalQuantity");
    const allUrl = `${window.location.href}`.toString();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.id}`
                );

                if (response.ok) {
                    const dataResponse = await response.json();
                    const { title, description, price } = dataResponse;
                    setTitle(title);
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

    return (
        <div className="flex flex-col w-full md:w-[50%] mx-auto my-10 gap-5">
            {/* <Card className="w-full border border-yellow-300/80 text-yellow-300/80 flex flex-col items-center py-2">
                <AlertTriangle />
                <p>MOHON MAAF!</p>
                <p>UNTUK SISTEM PEMESANAN DALAM APLIKASI</p>
                <p>BELUM TERSEDIA,</p>
                <p>SILAHKAN PILIH SISTEM PEMESANAN YANG TERSEDIA</p>
            </Card> */}
            <div className="flex flex-col whitespace-wrap w-[70%] text-muted-foreground">
                <p>
                    <span className="italic">catatan</span>
                    {` : nota bisa di screenshot untuk nanti di gunakan untuk
                    proses pemesanan `}
                    <Dialog>
                        <DialogTrigger className="w-fit text-foreground border rounded-md px-2">
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
                                {/* <CardDescription className="whitespace-wrap w-full flex justify-between">
                                    <p className="w-[50%]">deskripsi</p>
                                    <p className="w-[50%]">{`: ${description}`}</p>
                                </CardDescription> */}
                                <CardDescription className="whitespace-wrap w-full flex justify-between">
                                    <p className="w-[50%]">harga</p>
                                    <p className="w-[50%]">{`: ${numberFormat(
                                        price
                                    )} x ${totalQuantity}`}</p>
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="flex flex-col items-start gap-3">
                                <div className="flex w-full justify-between">
                                    <CardDescription className="w-[50%] text-foreground font-bold text-lg">
                                        Total Pembayaran
                                    </CardDescription>
                                    <CardDescription className="w-[50%] text-foreground font-bold text-lg">{`: ${numberFormat(
                                        Number(totalQuantity) * price
                                    )}`}</CardDescription>
                                </div>
                            </CardFooter>
                        </DialogContent>
                    </Dialog>
                </p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>DATA PESANAN</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-start gap-2">
                    <CardDescription className="whitespace-wrap w-full flex justify-between">
                        <p className="w-[50%]">barang</p>
                        <p className="w-[50%]">{`: ${title}`}</p>
                    </CardDescription>
                    <CardDescription className="whitespace-wrap w-full flex justify-between">
                        <p className="w-[50%]">deskripsi</p>
                        <p className="w-[50%]">{`: ${description}`}</p>
                    </CardDescription>
                    <CardDescription className="whitespace-wrap w-full flex justify-between">
                        <p className="w-[50%]">harga</p>
                        <p className="w-[50%]">{`: ${numberFormat(
                            price
                        )} x ${totalQuantity}`}</p>
                    </CardDescription>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-3">
                    <div className="flex w-full justify-between">
                        <CardDescription className="w-[50%]">
                            Total Pembayaran
                        </CardDescription>
                        <CardDescription className="w-[50%]">{`: ${numberFormat(
                            Number(totalQuantity) * price
                        )}`}</CardDescription>
                    </div>
                    <Link
                        href={`https://wa.me/+628608921729`}
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
    );
};

export default Payment;
