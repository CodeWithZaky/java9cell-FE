"use client";
import { SessionProvider } from "next-auth/react";

const SessionProviderWrap = ({ children }: { children: React.ReactNode }) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderWrap;
