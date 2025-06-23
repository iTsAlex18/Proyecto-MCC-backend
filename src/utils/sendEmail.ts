import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

const key = process.env.SENDGRID_API_KEY;
console.log('🔐 Clave API desde env:', key?.slice(0, 10)); // Muestra primeros 10 caracteres


export async function enviarCorreo(to: string, subject: string, body: string, postId: number) {
  const msg = {
    to,
    from: 'notificacionesmuseocananea@gmail.com', // Este correo debe estar verificado en SendGrid si usas plan gratuito
    subject,
    html: `
      <h2>${subject}</h2>
      <p>${body.slice(0, 100)}...</p>
      <a href="https://proyecto-mcc.vercel.app/blog/${postId}" target="_blank">Leer artículo completo</a>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log(`📬 Correo enviado a ${to}`);
  } catch (error) {
    console.error('❌ Error enviando correo:', error);
  }
  console.log(`📨 Enviando a ${to} desde ${msg.from}`);

}

