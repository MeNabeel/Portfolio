"use server";

import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import * as z from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function submitContact(formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    const validatedData = contactSchema.parse(rawData);

    // Save to Database
    await prisma.contact.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message,
      },
    });

    // We only try to send emails if the Resend API key is present
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'your_resend_api_key_here') {
      const ownerEmail = "nabeelijaz559@gmail.com";

      // 1. Send to Portfolio Owner
      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ownerEmail,
        subject: `New Portfolio Contact: ${validatedData.subject}`,
        html: `
          <h3>New Contact Submission</h3>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Subject:</strong> ${validatedData.subject}</p>
          <p><strong>Message:</strong><br/>${validatedData.message}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        `,
      });

      // 2. Auto-reply to Visitor
      await resend.emails.send({
        from: "Nabeel Ijaz <onboarding@resend.dev>",
        to: validatedData.email,
        subject: "Thank you for contacting Nabeel Ijaz",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Thank You for Reaching Out!</h2>
            <p>Hi ${validatedData.name},</p>
            <p>This is an automated message to confirm that I have received your inquiry regarding <strong>"${validatedData.subject}"</strong>.</p>
            <p>I aim to respond to all inquiries within 24-48 hours.</p>
            <p>Best regards,<br/><strong>Nabeel Ijaz</strong><br/>Software Engineer</p>
          </div>
        `,
      });
    }

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: "Validation failed. Please check your inputs." };
    }
    return { error: "An unexpected error occurred. Please try again later." };
  }
}
