import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    // In a real app, you would fetch from database
    // For now, return mock subscription data
    const subscription = {
      planId: null,
      planName: null,
      status: 'inactive' as const,
      currentPeriodEnd: null,
    };
    
    return NextResponse.json(subscription);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch subscription' },
      { status: 500 }
    );
  }
}