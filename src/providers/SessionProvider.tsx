"use client";
import { SessionProvider } from "next-auth/react";

const SessionProviderWrappper = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderWrappper;
