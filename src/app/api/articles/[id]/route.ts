import { NextRequest, NextResponse } from "next/server";
import { analyzeSeoScore } from "@/services/api/articleApi";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // In a real app, you would fetch from database
    // For now, we'll return mock data
    const mockArticle = {
      id: params.id,
      theme: "Sample Article",
      sections: [],
      tone: "professional" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(mockArticle);
  } catch (error) {
    console.error("Failed to fetch article:", error);
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const article = await request.json();

    // In a real app, you would update the database
    // For now, we'll just analyze SEO and return
    const seoScore = await analyzeSeoScore(article);
    const updatedArticle = {
      ...article,
      id: params.id,
      seoScore,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error("Failed to update article:", error);
    return NextResponse.json(
      { error: "Failed to update article" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // In a real app, you would delete from database
    console.log("Deleting article:", params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete article:", error);
    return NextResponse.json(
      { error: "Failed to delete article" },
      { status: 500 }
    );
  }
}
