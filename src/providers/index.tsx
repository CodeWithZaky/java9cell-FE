import ThemeProvider from "./ThemeProvider";
import SessionProvider from "./SessionProvider";
import QueryClientProvider from "./QueryClientProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <QueryClientProvider>{children}</QueryClientProvider>
            </ThemeProvider>
        </SessionProvider>
    );
};

export default Providers;
