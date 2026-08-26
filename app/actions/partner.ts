'use server';

import { Resend } from 'resend';
import { COMPANY } from '@/lib/config/company';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPartnerForm(formData: FormData) {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const comment = formData.get('comment') as string || '';

  if (!name || !phone) {
    return { error: 'Please fill in your name and phone number.' };
  }

  try {
    const { error } = await resend.emails.send({
      from: 'LINE AUTO <noreply@line-auto.rs>',
      to: COMPANY.email,
      subject: `Partnership request from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Comment:</strong> ${comment}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { error: 'Failed to send request. Please try again later.' };
    }
    return { success: 'Your request has been sent successfully!' };
  } catch (err) {
    console.error(err);
    return { error: 'Server error. Please try again later.' };
  }
}