import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    // In a real app, you would fetch from database
    // For now, return mock subscription data
    console.log("Fetching subscription for user:", params.userId);
    const subscription = {
      planId: null,
      planName: null,
      status: "inactive" as const,
      currentPeriodEnd: null,
    };

    return NextResponse.json(subscription);
  } catch (error) {
    console.error("Failed to fetch subscription:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscription" },
      { status: 500 }
    );
  }
}
