// app/actions/partner.ts
'use server';

import nodemailer from 'nodemailer';

export async function sendPartnerForm(formData: FormData) {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const comment = formData.get('comment') as string || '';

  if (!name || !phone) {
    return { error: 'Пожалуйста, заполните имя и телефон.' };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: 'lineauto@gmail.com',   // тот же адрес
      subject: `Заявка на сотрудничество от ${name}`,
      text: `
Имя: ${name}
Телефон: ${phone}
Комментарий: ${comment || 'не указано'}
      `,
      html: `
        <h3>Заявка на сотрудничество с LINE AUTO</h3>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Комментарий:</strong> ${comment || 'не указано'}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Ошибка отправки письма:', error);
    return { error: 'Не удалось отправить заявку. Попробуйте позвонить или напишите в Telegram.' };
  }
}