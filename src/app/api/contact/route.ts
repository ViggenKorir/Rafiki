import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { queries } from "@/lib/supabase";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  project_type: z.string().optional().default("General Inquiry"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = contactSchema.parse(body);

    // Submit inquiry to database
    const inquiry = await queries.submitInquiry({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      message: validatedData.message,
      project_type: validatedData.project_type,
    });

    // In a real application, you might also want to:
    // 1. Send an email notification to the admin
    // 2. Send a confirmation email to the user
    // 3. Log the inquiry for analytics

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been submitted successfully. We'll get back to you soon!",
        id: inquiry.id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Contact form submission error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid form data",
          errors: error.errors
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your request. Please try again later."
      },
      { status: 500 }
    );
  }
}

// Handle preflight OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
