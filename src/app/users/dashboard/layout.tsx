"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LayoutDashboard = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const LinkHref: any = [
        {
            name: "Products",
            href: "/users/dashboard/products",
        },
        {
            name: "Orders",
            href: "/users/dashboard/orders",
        },
    ];

    return (
        <div className="flex gap-5 w-full">
            <div className="flex flex-col gap-5 w-[20%] pt-10 pr-3 h-auto  border-r border-border">
                {LinkHref.map((item: any, index: number) => {
                    return (
                        <Link href={item.href} key={index}>
                            <Button
                                className={`w-full ${
                                    pathname === item.href
                                        ? "bg-primary"
                                        : "bg-primary"
                                }`}
                            >
                                {item.name}
                            </Button>
                        </Link>
                    );
                })}
            </div>
            <div className="w-[80%]">{children}</div>
        </div>
    );
};

export default LayoutDashboard;
