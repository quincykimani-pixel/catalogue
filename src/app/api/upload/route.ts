import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { v4 as uuidv4 } from "uuid";
import { writeFile } from "fs/promises";
import path from "path";

// POST /api/upload - accepts a single image file and stores it under
// /public/uploads, returning a URL that can be saved on a product.
export async function POST(request: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "Only JPG, PNG, WEBP or GIF images are allowed." },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const extension = file.name.split(".").pop() || "jpg";
  const filename = `${uuidv4()}.${extension}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  const filePath = path.join(uploadDir, filename);

  await writeFile(filePath, buffer);

  const url = `/uploads/${filename}`;
  return NextResponse.json({ url });
}
