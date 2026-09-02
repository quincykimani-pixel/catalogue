import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/ProductForm";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) notFound();

  return (
    <div>
      <h1 className="text-xl font-semibold text-navy mb-6">Edit Product</h1>
      <ProductForm
        initialValues={{
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          sku: product.sku,
          shortDescription: product.shortDescription,
          description: product.description,
          images: (product.images as string[]) ?? [],
          specifications: (product.specifications as { name: string; value: string }[]) ?? [],
          availability: product.availability,
          featured: product.featured,
        }}
      />
    </div>
  );
}
