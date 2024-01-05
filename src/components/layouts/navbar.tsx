"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../shadcn/mode-togle";
import { SheetDemo } from "./sheet";
import { usePathname, useRouter } from "next/navigation";
import { CardTitle } from "../ui/card";
import { HoverAvatar } from "./hover-avatar";
import { useSession } from "next-auth/react";
import SearchInput from "./search-input";
import { useEffect } from "react";

const Navbar = () => {
    const pathname = usePathname();
    const data = useSession();

    // if (pathname === "/auth/login" || pathname === "/auth/register") {
    //     return null;
    // }

    return (
        <div className="flex justify-end md:justify-center items-center py-5 border-b border-border px-10">
            <CardTitle className="hidden md:block font-bold w-[40%]">
                <Link href="/">
                    java<span className="text-primary">9</span>cell
                </Link>
            </CardTitle>
            <SearchInput />
            <div className="flex justify-end gap-4 w-[30%] md:w-[40%]">
                <div className="hidden lg:block">
                    <ModeToggle />
                </div>
                {data.status === "authenticated" ? (
                    <HoverAvatar />
                ) : (
                    <div className="inline-flex gap-3">
                        <Link href="/auth/login">
                            <Button variant={"outline"}>Login</Button>
                        </Link>
                        <Link href="/auth/register">
                            <Button>Register</Button>
                        </Link>
                    </div>
                )}

                <SheetDemo />
            </div>
        </div>
    );
};

export default Navbar;
