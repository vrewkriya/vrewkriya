import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/client";
import nodemailer from "nodemailer";
import sanitizeHtml from "sanitize-html";
import { getAutoReplyEmailTemplate } from "./emailTemplate";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { firstName, brand, email, countryCode, mobileNumber, service, message } = body;

    // 0. Sanitize all user input
    firstName = sanitizeHtml(firstName);
    brand = sanitizeHtml(brand);
    email = sanitizeHtml(email);
    countryCode = sanitizeHtml(countryCode);
    mobileNumber = sanitizeHtml(mobileNumber);
    service = sanitizeHtml(service);
    message = sanitizeHtml(message);

    console.log("Received contact form submission:", { firstName, brand, email, countryCode, mobileNumber, service });

    if (!firstName || !brand || !email || !countryCode || !mobileNumber || !service || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    // 1. Save to Sanity CMS
    try {
      if (!process.env.SANITY_API_TOKEN) {
         console.warn("No SANITY_API_TOKEN found, skipping database save");
      } else {
        const sanityClient = writeClient.withConfig({
          token: process.env.SANITY_API_TOKEN,
        });

        await sanityClient.create({
          _type: "inquiry",
          firstName,
          brand,
          email,
          phone: `${countryCode} ${mobileNumber}`,
          services: service,
          message,
          createdAt: new Date().toISOString(),
        });
        console.log("Successfully saved to Sanity!");
      }
    } catch (sanityError) {
      console.error("Sanity creation error:", sanityError);
    }

    // 2. Setup email transporter (prefer explicit SMTP settings; fallback to Gmail)
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Missing EMAIL_USER or EMAIL_PASS environment variables");
      throw new Error("Email configuration missing on server");
    }

    let transportOptions: any;
    if (process.env.SMTP_HOST && process.env.SMTP_PORT) {
      transportOptions = {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: String(process.env.SMTP_SECURE).toLowerCase() === "true",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      };
    } else {
      transportOptions = {
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      };
    }

    const transporter = nodemailer.createTransport(transportOptions);

    // 3. Send owner notification
    try {
      console.log(`Sending owner notification to vrewkriya@gmail.com`);

      await transporter.sendMail({
        from: `"${brand} Inquiry" <kiran@vrewkriya.com>`,
        to: "vrewkriya@gmail.com",
        replyTo: email,
        subject: `New inquiry from ${brand} - ${firstName}`,
        html: `
          <div style="font-family: sans-serif; color: #333; line-height: 1.6;">
            <h2 style="color: #c9a96e;">VREW KRIYA - New Inquiry</h2>
            <hr />
            <p><strong>Name:</strong> ${firstName}</p>
            <p><strong>Brand:</strong> ${brand}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mobile:</strong> ${countryCode} ${mobileNumber}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background: #f4f4f4; padding: 15px; border-radius: 4px;">${message}</p>
          </div>
        `,
      });

      console.log("Owner notification sent successfully!");
    } catch (emailError: Error | unknown) {
      const errorMessage = emailError instanceof Error ? emailError.message : "Failed to send owner email";
      console.error("Fatal error sending owner email:", emailError);
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 500 },
      );
    }

    // 5. Send client auto-reply
    try {
      console.log(`Sending auto-reply to ${email}`);

      const autoReplyHtml = getAutoReplyEmailTemplate(firstName, brand, service, message, `${countryCode} ${mobileNumber}`);

      await transporter.sendMail({
        from: `"The Vrewkriya Team" <kiran@vrewkriya.com>`,
        to: email,
        subject: `Thank you for choosing Vrewkriya, ${firstName}!`,
        html: autoReplyHtml,
      });

      console.log("Auto-reply sent successfully!");
    } catch (autoReplyError) {
      console.error("Auto-reply email error:", autoReplyError);
    }

    return NextResponse.json({ success: true, message: "Delivery complete!" });
  } catch (error: Error | unknown) {
    const errorMessage = error instanceof Error ? error.message : "A critical server error occurred.";
    console.error("CRITICAL Contact form major error:", error);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}