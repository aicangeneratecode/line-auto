'use server';

import { Resend } from 'resend';
import { COMPANY } from '@/lib/config/company';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactForm(formData: FormData) {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const message = formData.get('message') as string || '';

  // Получаем все файлы по ключу 'photos'
  const files = formData.getAll('photos') as File[];
  const MAX_FILES = 5;
  const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

  // Валидация текстовых полей
  if (!name || !phone) {
    return { error: 'Please fill in your name and phone number.' };
  }

  // Валидация файлов
  if (files.length > MAX_FILES) {
    return { error: `You can upload up to ${MAX_FILES} photos.` };
  }
  for (const file of files) {
    if (file.size > MAX_SIZE) {
      return { error: `File "${file.name}" exceeds 5 MB limit.` };
    }
    if (!file.type.startsWith('image/')) {
      return { error: `File "${file.name}" is not an image.` };
    }
  }

  // Подготовка вложений
  const attachments = await Promise.all(
    files.map(async (file) => ({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()),
    }))
  );

  try {
    const { error } = await resend.emails.send({
      from: 'LINE AUTO <noreply@line-auto.rs>',
      to: COMPANY.email,
      subject: `New message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Number of photos:</strong> ${files.length}</p>
      `,
      attachments,
    });

    if (error) {
      console.error('Resend error:', error);
      return { error: 'Failed to send message. Please try again later.' };
    }
    return { success: 'Your message has been sent successfully!' };
  } catch (err) {
    console.error(err);
    return { error: 'Server error. Please try again later.' };
  }
}