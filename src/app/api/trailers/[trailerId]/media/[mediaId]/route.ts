import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, context: { params: Promise<{ trailerId: string; mediaId: string }> }) {
  const params = await context.params;

  try {
    // Get current media state
    const currentMedia = await prisma.trailerMedia.findUnique({
      where: {
        id: params.mediaId,
        trailerId: params.trailerId,
      },
    });

    if (!currentMedia) {
      return new NextResponse("Media not found", { status: 404 });
    }

    // Toggle isDeleted status
    const media = await prisma.trailerMedia.update({
      where: {
        id: params.mediaId,
        trailerId: params.trailerId,
      },
      data: {
        isDeleted: !currentMedia.isDeleted,
        // Only set isPrimary to false when deleting, not when undeleting
        ...(currentMedia.isDeleted ? {} : { isPrimary: false }),
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
