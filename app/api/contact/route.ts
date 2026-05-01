import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import nodemailer from "nodemailer";
import sanitizeHtml from "sanitize-html";
import { getAutoReplyEmailTemplate } from "./emailTemplate";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { firstName, brand, email, service, message, recaptchaToken } = body;

    // 0. Sanitize all user input to permanently destroy any malicious HTML/Script code
    firstName = sanitizeHtml(firstName);
    brand = sanitizeHtml(brand);
    email = sanitizeHtml(email);
    service = sanitizeHtml(service);
    message = sanitizeHtml(message);

    console.log("Received contact form submission:", { firstName, brand, email, service });

    if (!firstName || !brand || !email || !service || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!recaptchaToken) {
      return NextResponse.json(
        { success: false, error: "Missing reCAPTCHA token. Please verify you are human." },
        { status: 400 },
      );
    }

    // 0. Verify reCAPTCHA token
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      console.warn("Missing RECAPTCHA_SECRET_KEY. Skipping reCAPTCHA validation.");
    } else {
      const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;
      const recaptchaRes = await fetch(verifyUrl, { method: "POST" });
      const recaptchaJson = await recaptchaRes.json();

      if (!recaptchaJson.success) {
        console.error("reCAPTCHA validation failed:", recaptchaJson);
        return NextResponse.json(
          { success: false, error: "reCAPTCHA verification failed. Bots are not allowed." },
          { status: 400 },
        );
      }
      console.log("reCAPTCHA verified successfully!");
    }

    // 1. Attempt to save to Sanity CMS backend
    try {
      if (!process.env.SANITY_API_TOKEN) {
         console.warn("No SANITY_API_TOKEN found, skipping database save");
      } else {
        const sanityClient = client.withConfig({
          token: process.env.SANITY_API_TOKEN,
        });

        await sanityClient.create({
          _type: "inquiry",
          firstName,
          brand,
          email,
          services: service,
          message,
          createdAt: new Date().toISOString(),
        });
        console.log("Successfully saved to Sanity!");
      }
    } catch (sanityError) {
      console.error("Sanity creation error:", sanityError);
    }

    // Check for Email Config
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Missing EMAIL_USER or EMAIL_PASS environment variables");
      throw new Error("Email configuration missing on server");
    }

    // Create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 2. Send the notification email to the owner
    try {
      console.log(`Sending owner notification to vrewkriya@gmail.com via Gmail SMTP`);

      await transporter.sendMail({
        from: `"${brand} Inquiry" <${process.env.EMAIL_USER}>`,
        to: "vrewkriya@gmail.com",
        replyTo: email, // If you hit "Reply", it replies straight to the client
        subject: `New inquiry from ${brand} - ${firstName}`,
        html: `
          <div style="font-family: sans-serif; color: #333; line-height: 1.6;">
            <h2 style="color: #c9a96e;">VREW KRIYA - New Inquiry</h2>
            <hr />
            <p><strong>Name:</strong> ${firstName}</p>
            <p><strong>Brand:</strong> ${brand}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background: #f4f4f4; padding: 15px; border-radius: 4px;">${message}</p>
          </div>
        `,
      });

      console.log("Owner notification sent successfully!");
    } catch (emailError: any) {
      console.error("Fatal error sending owner email:", emailError);
      return NextResponse.json(
        { success: false, error: emailError?.message || "Failed to send owner email" },
        { status: 500 },
      );
    }

    // 3. Send the auto-reply email to the client user using the HTML template
    try {
      console.log(`Sending auto-reply (template) from ${process.env.EMAIL_USER} to ${email}`);

      const autoReplyHtml = getAutoReplyEmailTemplate(firstName, brand, service, message);

      await transporter.sendMail({
        from: `"The Vrewkriya Team" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Thank you for choosing Vrewkriya, ${firstName}!`,
        html: autoReplyHtml,
      });

      console.log("Auto-reply (template) sent successfully!");
    } catch (autoReplyError) {
      console.error("Auto-reply email error:", autoReplyError);
    }

    return NextResponse.json({ success: true, message: "Delivery complete!" });
  } catch (error: any) {
    console.error("CRITICAL Contact form major error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "A critical server error occurred." },
      { status: 500 },
    );
  }
}