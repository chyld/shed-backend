import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

function generateHexString(length: number): string {
  return Array.from({ length }, () => Math.floor(Math.random() * 16).toString(16)).join("");
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ trailerId: string }> }) {
  const resolvedParams = await params;
  try {
    const media = await prisma.trailerMedia.findMany({
      where: {
        trailerId: resolvedParams.trailerId,
      },
    });
    return NextResponse.json(media);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 500 });
    }
    return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ trailerId: string }> }) {
  const resolvedParams = await params;
  try {
    const formData = await request.formData();
    const files = formData.getAll("files");

    // Ensure uploads directory exists
    const publicPath = path.join(process.cwd(), "public", "uploads");
    await mkdir(publicPath, { recursive: true });

    const uploadPromises = files.map(async (file: FormDataEntryValue) => {
      if (!(file instanceof File)) {
        throw new Error("Invalid file type");
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Get file extension from original filename and convert to lowercase
      const extension = path.extname(file.name).toLowerCase();

      // Create 32-character hex filename
      const hexName = generateHexString(32);
      const filename = `${hexName}${extension}`;

      // Save file to public directory
      await writeFile(path.join(publicPath, filename), buffer);

      // Determine media type
      const type = file.type.startsWith("image/") ? "IMAGE" : "VIDEO";

      // Save to database
      return prisma.trailerMedia.create({
        data: {
          trailerId: resolvedParams.trailerId,
          path: `/uploads/${filename}`,
          isPhoto: type === "IMAGE",
          isPrimary: false,
        },
      });
    });

    const savedMedia = await Promise.all(uploadPromises);
    return NextResponse.json(savedMedia);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload media" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ trailerId: string }> }) {
  const resolvedParams = await params;
  try {
    const { mediaId } = await request.json();

    // First, set all media for this trailer to non-primary
    await prisma.trailerMedia.updateMany({
      where: {
        trailerId: resolvedParams.trailerId,
      },
      data: {
        isPrimary: false,
      },
    });

    // Then set the selected media as primary
    await prisma.trailerMedia.update({
      where: {
        id: mediaId,
      },
      data: {
        isPrimary: true,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Failed to update media" }, { status: 500 });
  }
}
