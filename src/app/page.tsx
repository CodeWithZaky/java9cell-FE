import CardProduct from "@/components/layouts/card-product";
import Footer from "@/components/layouts/footer";

export default function Home() {
    return (
        <main className="w-full pt-5 flex flex-col gap-10">
            <CardProduct />
            <Footer />
        </main>
    );
}
