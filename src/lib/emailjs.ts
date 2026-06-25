import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export interface EnquiryPayload {
  name: string;
  business_name: string;
  email: string;
  phone: string;
  business_type: string;
  has_website: string;
  looking_for: string;
  message: string;
}

export const isEmailJsConfigured = () =>
  Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

/**
 * Sends an enquiry via EmailJS. Recipient (popupmax@gmail.com) is configured
 * on the EmailJS template itself — see README for setup.
 */
export async function sendEnquiry(payload: EnquiryPayload) {
  if (!isEmailJsConfigured()) {
    throw new Error(
      'EmailJS is not configured. Add your keys to .env (see .env.example).'
    );
  }

  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    { ...payload, to_email: 'popupmax@gmail.com' },
    { publicKey: PUBLIC_KEY }
  );
}
