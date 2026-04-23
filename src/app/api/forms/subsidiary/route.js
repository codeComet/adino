import { NextResponse } from "next/server";
import { createTransporter, FROM, CONTACT_TO } from "@/lib/mailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Server-side validation
    if (!name?.trim()) {
      return NextResponse.json({ error: "Full name is required." }, { status: 400 });
    }
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
    }
    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const transporter = createTransporter();

    // Email to site owner
    await transporter.sendMail({
      from: FROM,
      to: CONTACT_TO,
      replyTo: email,
      subject: subject ? `[Subsidiary] ${subject} — from ${name}` : `[Subsidiary] New enquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #166636; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px;">New Subsidiary Enquiry</h1>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 120px; vertical-align: top;">Full Name</td>
                <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Email</td>
                <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;"><a href="mailto:${email}" style="color: #166636;">${email}</a></td>
              </tr>
              ${phone ? `<tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Phone</td>
                <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${phone}</td>
              </tr>` : ""}
              ${subject ? `<tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Subject</td>
                <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${subject}</td>
              </tr>` : ""}
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Message</td>
                <td style="padding: 8px 0; color: #111827; font-size: 14px; white-space: pre-wrap;">${message}</td>
              </tr>
            </table>
          </div>
        </div>
      `,
    });

    // Auto-reply to user (non-critical)
    try {
      await transporter.sendMail({
        from: FROM,
        to: email,
        subject: "We received your enquiry — Adino",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #166636; padding: 24px; border-radius: 8px 8px 0 0;">
              <h1 style="color: #ffffff; margin: 0; font-size: 22px;">Thank you, ${name}!</h1>
            </div>
            <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
              <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 16px;">
                We have received your enquiry and will get back to you shortly.
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
      console.warn("Auto-reply failed (non-critical):", replyErr.message);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Subsidiary form error:", error);
    return NextResponse.json(
      { error: "Failed to send enquiry. Please try again later." },
      { status: 500 }
    );
  }
}
