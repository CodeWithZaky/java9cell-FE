"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const formSchema = z.object({
    email: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
});

export default function LoginForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
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
    }

    return (
        <div className="min-h-screen w-[60%] md:w-[40%] lg:w-[30%] mx-auto flex justify-center items-center">
            <Card className="w-full p-5 flex flex-col justify-center items-center">
                <Label className="mb-5 text-xl">Login</Label>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 w-full px-1 md:px-4 lg:px-5"
                    >
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
                                    <FormDescription>
                                        This is your email.
                                    </FormDescription>
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
                                    <FormDescription>
                                        This is your password.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                        <div>
                            <Label className="w-full text-center">
                                {`Don't have an account? `}
                                <Link
                                    className="text-primary underline"
                                    href="/auth/register"
                                >
                                    Sign Up
                                </Link>
                            </Label>
                        </div>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
