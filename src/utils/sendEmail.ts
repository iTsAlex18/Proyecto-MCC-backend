import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function enviarCorreo(destinatario: string, titulo: string, contenido: string, postId: number) {
  const msg = {
    to: destinatario,
    from: 'notificaciones@museo.com',
    subject: `📢 Nuevo artículo: ${titulo}`,
    html: `
      <h2>${titulo}</h2>
      <p>${contenido.slice(0, 100)}...</p>
      <a href="https://tu-frontend.com/blog/${postId}" target="_blank">Leer artículo →</a>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log(`Correo enviado a ${destinatario}`);
  } catch (error) {
    console.error('Error enviando correo:', error);
  }
}
