"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function RecaptchaProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  console.log("reCAPTCHA site key:", siteKey);
  console.log("reCAPTCHA site key exists:", !!siteKey);

  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey || ""}>
      {children}
    </GoogleReCaptchaProvider>
  );
}