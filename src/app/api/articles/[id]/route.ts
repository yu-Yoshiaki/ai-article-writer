import { NextRequest, NextResponse } from 'next/server';
import { fetchArticleContent, analyzeSeoScore } from '@/services/api/articleApi';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // In a real app, you would fetch from database
    // For now, we'll return mock data
    const mockArticle = {
      id: params.id,
      theme: 'Sample Article',
      sections: [],
      tone: 'professional' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json(mockArticle);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch article' },
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
    return NextResponse.json(
      { error: 'Failed to update article' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // In a real app, you would delete from database
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete article' },
      { status: 500 }
    );
  }
}