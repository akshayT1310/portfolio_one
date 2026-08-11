import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      subject,
      message,
    } = body;

    // Validation
    if (
      !name?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !subject?.trim() ||
      !message?.trim()
    ) {
      return NextResponse.json(
        {
          ok: false,
          message: 'All fields are required.',
        },
        { status: 400 }
      );
    }

    // Save message to PostgreSQL
    const contact = await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        subject: subject.trim(),
        message: message.trim(),
      },
    });

    // Send email
    const { error: emailError } =
      await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: ['takshaymain13@gmail.com'],
        replyTo: email.trim(),
        subject: `New Contact Message: ${subject.trim()}`,
        html: `
          <div style="
            font-family: Arial, sans-serif;
            max-width: 650px;
            margin: 0 auto;
            padding: 30px;
            background: #ffffff;
            color: #222;
          ">

            <h2 style="
              margin-bottom: 25px;
              color: #0891b2;
            ">
              New Contact Form Submission
            </h2>

            <div style="
              padding: 20px;
              border: 1px solid #e5e7eb;
              border-radius: 12px;
            ">

              <p>
                <strong>Name:</strong>
                ${escapeHtml(name)}
              </p>

              <p>
                <strong>Email:</strong>
                ${escapeHtml(email)}
              </p>

              <p>
                <strong>Phone:</strong>
                ${escapeHtml(phone)}
              </p>

              <p>
                <strong>Subject:</strong>
                ${escapeHtml(subject)}
              </p>

              <hr style="
                border: none;
                border-top: 1px solid #e5e7eb;
                margin: 20px 0;
              " />

              <h3>Message</h3>

              <div style="
                padding: 15px;
                background: #f8fafc;
                border-radius: 10px;
                white-space: pre-wrap;
                line-height: 1.6;
              ">
                ${escapeHtml(message)}
              </div>

            </div>

            <p style="
              margin-top: 20px;
              color: #64748b;
              font-size: 13px;
            ">
              Message ID: ${contact.id}
            </p>

          </div>
        `,
      });

    if (emailError) {
      console.error(
        'Resend email error:',
        emailError
      );

      /*
       * Message is already saved in database.
       * So admin inbox will still contain it even
       * if email delivery fails.
       */
      return NextResponse.json({
        ok: true,
        message:
          'Message received successfully. Email notification could not be sent.',
        emailSent: false,
        id: contact.id,
      });
    }

    return NextResponse.json({
      ok: true,
      message: 'Message sent successfully.',
      emailSent: true,
      id: contact.id,
    });
  } catch (error) {
    console.error(
      'Contact API error:',
      error
    );

    return NextResponse.json(
      {
        ok: false,
        message:
          'Unable to process your message right now.',
      },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}