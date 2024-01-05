"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function RegisterForm() {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const formSchema = z
        .object({
            username: z.string().min(3).max(50),
            email: z.string().min(3).max(50),
            password: z.string().min(3).max(50),
            confirm_password: z.z.string().min(3).max(50),
        })
        .refine((data) => data.password === data.confirm_password, {
            message: "Passwords do not match",
            path: ["confirm_password"],
        });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirm_password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
        try {
            setLoading(true);
            const data = {
                ...values,
                name: values.username,
            };
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/users/signup`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            if (response.ok) {
                console.log(" berhasil dibuat! mendaftar");
                try {
                    const res = await signIn("credentials", {
                        email: values.email,
                        password: values.password,
                        redirect: false,
                        callbackUrl: "/",
                    });
                    if (!res?.error) {
                        router.back();
                    }
                } catch (error) {
                    console.log(error);
                }
                setLoading(false);
            } else {
                console.error(
                    "Gagal membuat mendaftar. Status:",
                    response.status,
                    response.statusText
                );
                const errorData = await response.json();
                console.error("Informasi tambahan:", errorData);
                setLoading(false);
            }
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-[60%] md:w-[40%] lg:w-[30%] mx-auto flex justify-center items-center">
            <Card className="w-full p-5 flex flex-col justify-center items-center">
                <Label className="mb-5 text-xl">REGISTER</Label>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5 w-full px-1 md:px-4 lg:px-5"
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="name..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="email..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="password..."
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirm_password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Confirm Password..."
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {loading ? (
                            <Button type="submit" className="w-full" disabled>
                                Register
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full">
                                Register
                            </Button>
                        )}
                        <div>
                            <Label className="w-full text-center">
                                {`Already have an account? `}
                                <Link
                                    className="text-primary underline"
                                    href="/auth/login"
                                >
                                    Sign In
                                </Link>
                            </Label>
                        </div>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
