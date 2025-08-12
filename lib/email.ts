import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

type SendEmailParams = {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
};

export async function sendEmail({ to, subject, html, from }: SendEmailParams) {
  if (!resend) {
    console.log("[email:dev]", { to, subject });
    return { id: "dev" };
  }
  const fromAddress = from || "Seven Acres <noreply@sevenacresestate.com>";
  const response = await resend.emails.send({ to, subject, html, from: fromAddress });
  return response;
}


