"use client";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    search: z.string().max(100),
});

const SearchInput = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values.search);
        setSearchQuery(values.search);
    }

    useEffect(() => {
        router.push(`?search=${searchQuery}`);
    }, [router, searchQuery]);

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
export default SearchInput;
