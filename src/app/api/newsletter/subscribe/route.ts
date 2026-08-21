import { NextRequest, NextResponse } from "next/server";
import { newsletterSubscribeSchema } from "@/lib/newsletter";

export async function POST(req: NextRequest) {
  try {
    const parsed = newsletterSubscribeSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    const { email } = parsed.data;

    const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
    const apiKey = process.env.BEEHIIV_API_KEY;
    const encodeEmail = encodeURIComponent(email);

    if (!publicationId || !apiKey) {
      console.error(
        "Missing Beehiiv env. Put BEEHIIV_PUBLICATION_ID and BEEHIIV_API_KEY in a root .env and restart next dev.",
      );
      return NextResponse.json(
        { error: "Newsletter is not configured" },
        { status: 500 },
      );
    }

    // first check if mail is already subscribed
    const existingRes = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions/by_email/${encodeEmail}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    if(existingRes.ok) {
      const existingResponse = await existingRes.json();
      const status = existingResponse.data.status as string | undefined;

      if(status === "active" || status === "pending") {
        return NextResponse.json(
          { alreadySubscribed: true, status },
          { status: 409 },
        );
      }
    }

    if (existingRes.status !== 404 && existingRes.ok === false) {
      const data = await existingRes.json().catch(() => null);
      return NextResponse.json({ error: data }, { status: existingRes.status });
    }
    
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);

    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
