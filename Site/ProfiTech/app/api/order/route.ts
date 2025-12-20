import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, company, email, phone, comment, items } = body

    // Validate required fields
    if (!name || !company || !email || !phone || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Все обязательные поля должны быть заполнены' },
        { status: 400 }
      )
    }

    // Create email transporter
    // NOTE: Configure these environment variables in your .env.local file
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Format order items
    const itemsList = items
      .map((item: any) => `- ${item.name} (${item.quantity} шт.)`)
      .join('\n')

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.ORDER_EMAIL || process.env.SMTP_USER,
      subject: `Новая заявка от ${name} (${company})`,
      text: `
Новая заявка с сайта ProfiTech

Контактная информация:
Имя: ${name}
Компания: ${company}
Email: ${email}
Телефон: ${phone}
${comment ? `Комментарий: ${comment}` : ''}

Состав заказа:
${itemsList}

Всего товаров: ${items.reduce((sum: number, item: any) => sum + item.quantity, 0)} шт.
      `,
      html: `
        <h2>Новая заявка с сайта ProfiTech</h2>
        <h3>Контактная информация:</h3>
        <ul>
          <li><strong>Имя:</strong> ${name}</li>
          <li><strong>Компания:</strong> ${company}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Телефон:</strong> ${phone}</li>
          ${comment ? `<li><strong>Комментарий:</strong> ${comment}</li>` : ''}
        </ul>
        <h3>Состав заказа:</h3>
        <ul>
          ${items.map((item: any) => `<li>${item.name} (${item.quantity} шт.)</li>`).join('')}
        </ul>
        <p><strong>Всего товаров: ${items.reduce((sum: number, item: any) => sum + item.quantity, 0)} шт.</strong></p>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true, message: 'Заявка успешно отправлена' })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Ошибка при отправке заявки. Попробуйте позже.' },
      { status: 500 }
    )
  }
}

