"use client";
import { Button } from "@/components/ui/button";
import useProductData from "@/hooks/useProductData";
import Link from "next/link";
import { Fragment } from "react";
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
import { Label } from "@/components/ui/label";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSession } from "next-auth/react";
import { User } from "@/types/session";
import { useToast } from "@/components/ui/use-toast";
import usePriceFormat from "@/hooks/usePriceFormat";
import { useRouter } from "next/navigation";

const Dashboard = () => {
    const { products: prod, loading: load, error: err } = useProductData();
    const { numberFormat } = usePriceFormat();
    const router = useRouter();

    const data = useSession();

    const { toast } = useToast();

    const { data: session } = data;

    const user: any = data?.data?.user as
        | {
              name?: string | null | undefined;
              email?: string | null | undefined;
              image?: string | null | undefined;
          }
        | undefined;

    if (user?.user?.roles[0] !== "admin") {
        router.push("/");
    }

    if (load) {
        return <div>Loading...</div>;
    }

    if (err) {
        return <div>Error: {err}</div>;
    }

    const onDelete = async (id: number) => {
        try {
            const token = (session?.user as User)?.accessToken;
            if (!token) {
                console.error("Token akses tidak tersedia.");
                return;
            }
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.ok) {
                toast({
                    title: "Produk Berhasil",
                    description: "Produk berhasil dihapus!",
                });
                window.location.reload();
            } else {
                console.error(
                    "Gagal menghapus produk. Status:",
                    response.status,
                    response.statusText
                );
                toast({
                    variant: "destructive",
                    title: "Gagal menghapus produk. Cobalagi!",
                });
                const errorData = await response.json();
                console.error("Informasi tambahan:", errorData);
            }
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
        }
    };

    return (
        <div className="flex flex-col justify-start items-start gap-10 w-[60%] mx-auto mt-10">
            <div className="flex justify-between w-full border-b border-border">
                <CardTitle className="py-5 ">DASHBOARD</CardTitle>
                <Button>
                    <Link href={"/product/create/"}>{"Add Product +"}</Link>
                </Button>
            </div>
            <div className="flex flex-col gap-3 w-full">
                {prod.map((product: Product, index: number) => {
                    const img = product.images.join(",");

                    return (
                        <Fragment key={index}>
                            <Card className="flex ">
                                <CardHeader>
                                    <div className="relative aspect-square h-[150px] w-[150px] bg-background rounded-lg">
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
                                <div className="flex flex-col my-5">
                                    <CardContent>
                                        <Label>{product.title}</Label>
                                        <CardDescription className="whitespace-wrap mt-2">
                                            {product.description}
                                        </CardDescription>
                                        <CardDescription className="whitespace-wrap text-foreground/80 mt-2">
                                            {`stock: ${product.stock}`}
                                        </CardDescription>
                                        <CardTitle className="mt-4 whitespace-wrap">
                                            {numberFormat(product.price)}
                                        </CardTitle>
                                    </CardContent>
                                    <CardFooter className="flex justify-start gap-5">
                                        <Link
                                            href={`/product/update/${product.id}`}
                                        >
                                            <Button variant="outline">
                                                Edit
                                            </Button>
                                        </Link>
                                        <AlertDialog>
                                            <AlertDialogTrigger>
                                                <Button variant={"destructive"}>
                                                    Delete
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Are you absolutely sure?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be
                                                        undone. This will
                                                        permanently delete your
                                                        product data and remove
                                                        your product data from
                                                        our servers.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() =>
                                                            onDelete(product.id)
                                                        }
                                                    >
                                                        Continue
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </CardFooter>
                                </div>
                            </Card>
                        </Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default Dashboard;
