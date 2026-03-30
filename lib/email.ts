import "server-only";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetEmail(to: string, resetUrl: string) {
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev", // gamitin ito habang walang custom domain
    to,
    subject: "Reset your password",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
        <h2>Reset your password</h2>
        <p>Click the button below to reset your password. This link expires in <strong>1 hour</strong>.</p>
        <a
          href="${resetUrl}"
          style="display:inline-block;padding:12px 24px;background:#10b981;color:#fff;border-radius:8px;text-decoration:none;font-weight:bold;"
        >
          Reset Password
        </a>
        <p style="margin-top:16px;color:#6b7280;font-size:13px;">
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("[sendResetEmail] Resend error:", error);
    throw new Error(error.message);
  }

  console.log("[sendResetEmail] Email sent successfully:", data?.id);
}
