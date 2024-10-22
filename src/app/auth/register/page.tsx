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

            const userData = {
                name: values.username,
                email: values.email,
                password: values.password,
            };

            const signUpResponse = await signUpUser(userData);
            if (signUpResponse.success) {
                await signInUser(values.email, values.password);
                router.back();
            } else {
                console.error(
                    "Gagal membuat mendaftar. Status:",
                    signUpResponse.status
                );
                console.error("Informasi tambahan:", signUpResponse.errorData);
            }
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
        } finally {
            setLoading(false);
        }
    }

    async function signUpUser(userData: any) {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/signup`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            }
        );

        if (response.ok) {
            console.log("Berhasil dibuat! Mendaftar");
            return { success: true };
        } else {
            const errorData = await response.json();
            return { success: false, status: response.status, errorData };
        }
    }

    async function signInUser(email: string, password: string) {
        try {
            const signInResponse = await signIn("credentials", {
                email,
                password,
                redirect: false,
                callbackUrl: "/",
            });

            if (signInResponse?.error) {
                console.error("Gagal masuk:", signInResponse.error);
            }
        } catch (error) {
            console.error("Gagal masuk:", error);
        }
    }

    const form_fields = [
        {
            name: "username",
            form_label: "Username",
            placeholder: "name...",
            type: "text",
        },
        {
            name: "email",
            form_label: "Email",
            placeholder: "email...",
            type: "email",
        },
        {
            name: "password",
            form_label: "Password",
            placeholder: "password...",
            type: "password",
        },
        {
            name: "confirm_password",
            form_label: "Confirm Password",
            placeholder: "confirm password...",
            type: "password",
        },
    ];

    return (
        <div className="min-h-screen w-[60%] md:w-[40%] lg:w-[30%] mx-auto flex justify-center items-center">
            <Card className="w-full p-5 flex flex-col justify-center items-center">
                <Label className="mb-5 text-xl">REGISTER</Label>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5 w-full px-1 md:px-4 lg:px-5"
                    >
                        {form_fields.map((form_field: any) => (
                            <FormField
                                key={form_field.name}
                                control={form.control}
                                name={form_field.name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {form_field.form_label}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={
                                                    form_field.placeholder
                                                }
                                                type={form_field.type}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
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
