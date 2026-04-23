import { NextResponse } from "next/server";
import { createTransporter, FROM, NEWSLETTER_TO } from "@/lib/mailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
    }

    const transporter = createTransporter();

    // Notify site owner
    await transporter.sendMail({
      from: FROM,
      to: NEWSLETTER_TO,
      subject: "New Newsletter Subscription",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #166636; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px;">New Newsletter Subscriber</h1>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
            <p style="color: #374151; font-size: 15px; margin: 0;">
              <strong>Email:</strong> <a href="mailto:${email}" style="color: #166636;">${email}</a>
            </p>
          </div>
        </div>
      `,
    });

    // Confirmation to subscriber (non-critical)
    try {
      await transporter.sendMail({
        from: FROM,
        to: email,
        subject: "You're subscribed! — Adino",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #166636; padding: 24px; border-radius: 8px 8px 0 0;">
              <h1 style="color: #ffffff; margin: 0; font-size: 22px;">Welcome to Adino Newsletter!</h1>
            </div>
            <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
              <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 16px;">
                You have successfully subscribed to the Adino newsletter. You will receive the latest updates and insights directly in your inbox.
              </p>
              <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0;">
                Best regards,<br/>
                <strong>The Adino Team</strong>
              </p>
            </div>
          </div>
        `,
      });
    } catch (replyErr) {
      console.warn("Confirmation email failed (non-critical):", replyErr.message);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Newsletter form error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again later." },
      { status: 500 }
    );
  }
}
