import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AvatarDemo({ fallback }: { fallback?: string }) {
    return (
        <Avatar>
            {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
            <AvatarFallback className="uppercase">
                {fallback?.slice(0, 2)}
            </AvatarFallback>
        </Avatar>
    );
}
