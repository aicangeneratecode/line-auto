// app/actions/contact.ts
'use server';

import nodemailer from 'nodemailer';

export async function sendContactForm(formData: FormData) {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const message = formData.get('message') as string || '';

  // Простая валидация
  if (!name || !phone) {
    return { error: 'Пожалуйста, заполните имя и телефон.' };
  }

  // Настройка транспорта
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true для 465, false для других
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || 'info@lineauto.rs',
      subject: `Новая заявка с сайта LINE AUTO от ${name}`,
      text: `
Имя: ${name}
Телефон: ${phone}
Сообщение: ${message || 'не указано'}
      `,
      html: `
        <h3>Новая заявка с сайта LINE AUTO</h3>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Сообщение:</strong> ${message || 'не указано'}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Ошибка отправки письма:', error);
    return { error: 'Не удалось отправить заявку. Попробуйте позвонить или напишите в Telegram.' };
  }
}