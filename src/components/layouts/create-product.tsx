// "use client";
// import { Button } from "@/components/ui/button";
// import { FormItem } from "@/components/ui/form";
// import { Textarea } from "@/components/ui/textarea";
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "../ui/input";
// import Image from "next/image";
// import { useState } from "react";
// import { useSession } from "next-auth/react";
// import { User } from "@/types/session";
// import { Label } from "../ui/label";

// export function CreateProduct() {
//     const [title, setTitle] = useState<string>("");
//     const [description, setDescription] = useState<string>("");
//     const [images, setImages] = useState<string[]>([]);
//     const [price, setPrice] = useState<number>(0);
//     const [stock, setStock] = useState<number>(0);
//     const [categoryId, setCategoryId] = useState<number>(3);

//     const [imagePreview, setImagePreview] = useState<any>("");

//     const { data: session } = useSession();

//     const onSubmit = async () => {
//         try {
//             const data = {
//                 title,
//                 description,
//                 images,
//                 price,
//                 stock,
//                 categoryId,
//             };
//             // Then, you can use this interface in your code:
//             const token = (session?.user as User)?.accessToken;
//             if (!token) {
//                 console.error("Token akses tidak tersedia.");
//                 return;
//             }
//             const response = await fetch(
//                 `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`,
//                     },
//                     body: JSON.stringify(data),
//                 }
//             );
//             if (response.ok) {
//                 console.log("Produk berhasil dibuat!");
//             } else {
//                 console.error(
//                     "Gagal membuat produk. Status:",
//                     response.status,
//                     response.statusText
//                 );
//                 const errorData = await response.json();
//                 console.error("Informasi tambahan:", errorData);
//             }
//         } catch (error) {
//             console.error("Terjadi kesalahan:", error);
//         }
//     };

//     const onImageUpload = (e: any) => {
//         const file = e.target.files[0];
//         setImages(file);
//         const img = new FormData();
//         img.append("image", file);
//         const im = URL.createObjectURL(file);
//         setImagePreview(URL.createObjectURL(file));
//     };

//     return (
//         <Dialog>
//             <DialogTrigger asChild>
//                 <Button variant="outline">Create product</Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                     <DialogTitle>Edit profile</DialogTitle>
//                 </DialogHeader>
//                 <div className="flex flex-col gap-3">
//                     <FormItem>
//                         <Label>Image</Label>
//                         {imagePreview ? (
//                             <Image
//                                 src={imagePreview}
//                                 width={100}
//                                 height={100}
//                                 alt="image"
//                             />
//                         ) : (
//                             <div className="h-[50px] w-[50px] bg-card" />
//                         )}
//                         <input
//                             type="file"
//                             onChange={(e) => {
//                                 if (e.target.files) {
//                                     onImageUpload(e);
//                                 }
//                             }}
//                         />
//                     </FormItem>

//                     <FormItem>
//                         <Label>Title</Label>
//                         <Input
//                             placeholder="title..."
//                             onChange={(e) => setTitle(e.target.value)}
//                         />
//                     </FormItem>

//                     <FormItem>
//                         <Label>Price</Label>
//                         <Input
//                             placeholder="price..."
//                             onChange={(e) => setPrice(Number(e.target.value))}
//                         />
//                     </FormItem>
//                     <FormItem>
//                         <Label>Stock</Label>
//                         <Input
//                             placeholder="stock..."
//                             onChange={(e) => setStock(Number(e.target.value))}
//                         />
//                     </FormItem>
//                     <FormItem>
//                         <Label>Description</Label>
//                         <Textarea
//                             placeholder="Description..."
//                             className="resize-none"
//                             onChange={(e) => setDescription(e.target.value)}
//                         />
//                     </FormItem>
//                     <Button onClick={onSubmit}>Create</Button>
//                 </div>
//             </DialogContent>
//         </Dialog>
//     );
// }
