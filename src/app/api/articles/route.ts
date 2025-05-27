import { NextRequest, NextResponse } from "next/server";
import { generateArticle, analyzeSeo } from "@/services/articleService";
import { generateId } from "@/utils/generateId";
import { Article } from "@/types";

export async function GET(_request: NextRequest) {
  try {
    // In a real app, you would fetch from database with pagination
    const articles: Article[] = [];

    return NextResponse.json({
      articles,
      total: 0,
      page: 1,
      limit: 20,
    });
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { theme } = await request.json();

    if (!theme) {
      return NextResponse.json({ error: "Theme is required" }, { status: 400 });
    }

    const article = await generateArticle(theme);
    const seoScore = await analyzeSeo(article);

    const newArticle = {
      ...article,
      id: generateId(),
      seoScore,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // In a real app, you would save to database

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.error("Failed to generate article:", error);
    return NextResponse.json(
      { error: "Failed to generate article" },
      { status: 500 }
    );
  }
}
