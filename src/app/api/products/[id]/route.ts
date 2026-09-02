import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

// GET a single product by id or slug (public)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = await prisma.product.findFirst({
    where: { OR: [{ id: params.id }, { slug: params.id }] },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  return NextResponse.json(product);
}

// PUT update a product (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const product = await prisma.product.update({
    where: { id: params.id },
    data: {
      name: body.name,
      category: body.category,
      price: Number(body.price),
      sku: body.sku || null,
      shortDescription: body.shortDescription || "",
      description: body.description || "",
      images: body.images || [],
      specifications: body.specifications || [],
      availability: body.availability || "In Stock",
      featured: !!body.featured,
    },
  });

  return NextResponse.json(product);
}

// DELETE a product (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.product.delete({ where: { id: params.id } });

  return NextResponse.json({ ok: true });
}
