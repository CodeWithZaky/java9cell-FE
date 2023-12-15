import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Fragment } from "react";
import { ModeToggle } from "./mode-togle";
import { AvatarDemo } from "./avatar";

export function SheetDemo() {
    const data = useSession();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <div className="inline-flex justify-between py-5">
                        <ModeToggle />
                        <AvatarDemo />
                    </div>
                </SheetHeader>
                <div className="flex flex-col justify-end gap-3 mt-3">
                    {data.status === "authenticated" ? (
                        <Button
                            onClick={() => signOut()}
                            variant={"destructive"}
                        >
                            Logout
                        </Button>
                    ) : (
                        <Fragment>
                            <Button onClick={() => signIn()}>Login</Button>
                            <Button>
                                <Link href="/auth/register">Register</Link>
                            </Button>
                        </Fragment>
                    )}
                    <Button variant="outline" className="w-fit">
                        <Link href="/users/dashboard">Dashboard</Link>
                    </Button>
                    <Button variant="outline" className="w-fit">
                        <Link href="/product/create">Add product</Link>
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
