interface User {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    accessToken: string; // Add the 'accessToken' property here
}

export type { User };
