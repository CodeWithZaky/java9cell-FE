"use client";
import CardProduct from "@/components/card-product";
import Footer from "@/components/footer";

export default function HomePage({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full pt-5 flex flex-col gap-10">
            <CardProduct />
            <Footer />
        </main>
    );
}
