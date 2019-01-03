import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || "",
  domain: "sandbox2f744d74a845437587ddad210f8338fb.mailgun.org"
});

const sendEmail = (to: string, subject: string, html: string) => {
  to = "bronxofsoul@gmail.com";
  const emailData = {
    from: "bronxofsoul@gmail.com",
    to,
    subject,
    html
  };
  return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (
  to: string,
  fullName: string,
  key: string
) => {
  const emailSubject = `hello! ${fullName}, please verify your email!`;
  const emailBody = `Verify your email by clicking <a href="http://ww.ww.ww?=${key}">here</a>`;

  return sendEmail(to, emailSubject, emailBody);
};
