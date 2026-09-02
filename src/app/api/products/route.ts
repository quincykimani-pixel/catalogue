import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// GET /api/products - public listing with optional search/category/filter
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();
  const category = searchParams.get("category")?.trim();
  const featured = searchParams.get("featured");

  const where: any = {};
  if (category) where.category = category;
  if (featured === "true") where.featured = true;
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { category: { contains: q, mode: "insensitive" } },
      { sku: { contains: q, mode: "insensitive" } },
    ];
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}

// POST /api/products - create a product (admin only)
export async function POST(request: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (!body.name || !body.category || body.price === undefined) {
    return NextResponse.json(
      { error: "Name, category and price are required." },
      { status: 400 }
    );
  }

  let slug = slugify(body.name);
  const existing = await prisma.product.findUnique({ where: { slug } });
  if (existing) {
    slug = `${slug}-${Date.now().toString().slice(-5)}`;
  }

  const product = await prisma.product.create({
    data: {
      name: body.name,
      slug,
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

  return NextResponse.json(product, { status: 201 });
}
