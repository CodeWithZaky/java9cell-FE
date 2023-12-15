import { CalendarDays } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { AvatarDemo } from "../shadcn/avatar";
import { useSession } from "next-auth/react";

export function HoverAvatar() {
    const { data: session } = useSession();

    const infoUser: any = session?.user;
    const user: any = infoUser?.user;

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Button variant="link">
                    <AvatarDemo />
                </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-60">
                <div className="flex justify-between space-x-4">
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">
                            {`name : ${user?.name}`}
                        </h4>
                        <h4 className="text-sm font-semibold">
                            {`email : ${user?.email}`}
                        </h4>
                        <div className="flex items-center pt-2">
                            <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                            <span className="text-xs text-muted-foreground">
                                Joined December 2021
                            </span>
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}
