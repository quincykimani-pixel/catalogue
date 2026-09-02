import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { put } from "@vercel/blob";
import { randomUUID } from "crypto";

// POST /api/upload - accepts a single image file and stores it in Vercel
// Blob storage, returning a public URL that can be saved on a product.
//
// Vercel Blob is used instead of writing to the local filesystem because
// serverless functions (including Vercel's) have a read-only/ephemeral
// filesystem in production — files written to disk would disappear (or
// fail to write at all) between requests. Blob storage works the same way
// both locally and once deployed, as long as BLOB_READ_WRITE_TOKEN is set.
export async function POST(request: NextRequest) {
  try {
    if (!isAuthenticated()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        {
          error:
            "Image storage isn't configured yet. Add BLOB_READ_WRITE_TOKEN to your environment variables (see README).",
        },
        { status: 500 }
      );
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

    const extension = file.name.split(".").pop() || "jpg";
    const filename = `products/${randomUUID()}.${extension}`;

    const blob = await put(filename, file, {
      access: "public",
      contentType: file.type,
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Image upload failed:", error);
    return NextResponse.json(
      { error: "Something went wrong saving the image. Check the server terminal for details." },
      { status: 500 }
    );
  }
}