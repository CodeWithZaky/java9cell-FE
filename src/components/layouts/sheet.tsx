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
import { ModeToggle } from "../shadcn/mode-togle";
import { AvatarDemo } from "../shadcn/avatar";
import { CalendarDays } from "lucide-react";

export function SheetDemo() {
    const { data, status } = useSession();

    const user: any = data?.user as
        | {
              name?: string | null | undefined;
              email?: string | null | undefined;
              image?: string | null | undefined;
          }
        | undefined;

    const formatter = new Intl.DateTimeFormat("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <div className="inline-flex justify-between py-5 mt-5">
                        <div className="flex gap-3">
                            <AvatarDemo fallback={user?.user?.name} />
                            <div className="text-sm text-muted-foreground">
                                {status === "authenticated" ? (
                                    <>
                                        <p>Name: {user?.user?.name}</p>
                                        <p>Email: {user?.user?.email}</p>
                                    </>
                                ) : null}
                            </div>
                        </div>

                        <ModeToggle />
                    </div>
                </SheetHeader>
                <div className="flex flex-col justify-end gap-3 mt-3">
                    {status === "authenticated" ? (
                        <Button
                            onClick={() => signOut()}
                            variant={"destructive"}
                        >
                            Logout
                        </Button>
                    ) : (
                        <Fragment>
                            <Button onClick={() => signIn()}>Login</Button>
                            <Link href="/auth/register">
                                <Button className="w-full">Register</Button>
                            </Link>
                        </Fragment>
                    )}
                    <div className="flex items-center">
                        <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                        <span className="text-xs text-muted-foreground">
                            {formatter.format(Date.now())}
                        </span>
                    </div>
                    {user?.user?.roles == "admin" ? (
                        <>
                            <Link href="/users/dashboard">
                                <Button className="w-full">Dashboard</Button>
                            </Link>
                            <Link href="/product/create">
                                <Button className="w-full">Add product</Button>
                            </Link>
                        </>
                    ) : null}
                </div>
            </SheetContent>
        </Sheet>
    );
}
