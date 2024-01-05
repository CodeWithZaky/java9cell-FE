export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/users/dashboard",
        "/product/create",
        "/product/update",
        "/buy/:path*",
    ],
};
