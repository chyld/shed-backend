import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, context: { params: Promise<{ shedId: string; mediaId: string }> }) {
  const params = await context.params;

  try {
    // Get current media state
    const currentMedia = await prisma.shedMedia.findUnique({
      where: {
        id: params.mediaId,
        shedId: params.shedId,
      },
    });

    if (!currentMedia) {
      return new NextResponse("Media not found", { status: 404 });
    }

    // Toggle isDeleted status
    const media = await prisma.shedMedia.update({
      where: {
        id: params.mediaId,
        shedId: params.shedId,
      },
      data: {
        isDeleted: !currentMedia.isDeleted,
        // Only set isPrimary to false when deleting, not when undeleting
        ...(currentMedia.isDeleted ? {} : { isPrimary: false }),
      },
    });

    return NextResponse.json(media);
  } catch (error) {
    return new NextResponse("Error updating media", { status: 500 });
  }
}
