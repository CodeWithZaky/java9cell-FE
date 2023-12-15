"use client";

import * as z from "zod";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../shadcn/mode-togle";
import { AvatarDemo } from "../shadcn/avatar";
import { SheetDemo } from "../shadcn/sheet";
import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { CardTitle } from "../ui/card";
import { HoverAvatar } from "./hover-avatar";
import { useSession } from "next-auth/react";

const Navbar = () => {
    const pathname = usePathname();
    const data = useSession();

    // if (pathname === "/auth/login" || pathname === "/auth/register") {
    //     return null;
    // }

    return (
        <div className="flex justify-center items-center py-5 border-b border-border px-10">
            <Link href="/" className="font-bold w-[40%]">
                <CardTitle>ToSerBa</CardTitle>
            </Link>
            <SearchInput />
            <div className="flex justify-end gap-4 w-[40%]">
                <div className="hidden lg:block">
                    <ModeToggle />
                </div>
                {data.status === "authenticated" ? (
                    <HoverAvatar />
                ) : (
                    <div className="inline-flex gap-3">
                        <Button variant={"outline"}>
                            <Link href="/auth/login">Login</Link>
                        </Button>
                        <Button>
                            <Link href="/auth/register">Register</Link>
                        </Button>
                    </div>
                )}

                <SheetDemo />
            </div>
        </div>
    );
};

export default Navbar;

const formSchema = z.object({
    search: z.string().min(2).max(100),
});

const SearchInput = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log({ values });
    }

    return (
        <div className="w-[60%]">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex justify-between gap-3 w-full "
                >
                    <FormField
                        control={form.control}
                        name="search"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input
                                        placeholder="search for products..."
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Search</Button>
                </form>
            </Form>
        </div>
    );
};
