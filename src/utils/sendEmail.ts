import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

const key = process.env.SENDGRID_API_KEY;
console.log('🔐 Clave API desde env:', key?.slice(0, 10));

export async function enviarCorreo(to: string, subject: string, body: string, postId: number) {
  const msg = {
    to,
    from: 'notificacionesmuseocananea@gmail.com',
    subject,
    html: `
      <div style="font-family:Arial,sans-serif; max-width:600px; margin:20px auto; padding:20px; border:1px solid #ddd; border-radius:8px; background-color:#fdfdfd;">
        <h2 style="color:#333333; font-size:22px; margin-bottom:10px;">📢 Nuevo artículo del museo</h2>
        
        <p style="font-size:16px; color:#555555; line-height:1.5;">
          <strong>${subject}</strong>
        </p>

        <p style="font-size:14px; color:#777777; line-height:1.6;">
          ${body.slice(0, 150)}...
        </p>

        <div style="text-align:center; margin:25px 0;">
          <a href="https://proyecto-mcc.vercel.app/blog" 
             style="background-color:#e7662f; color:white; padding:12px 20px; text-decoration:none; border-radius:5px; font-size:15px; display:inline-block;">
            📰 Ver blog completo
          </a>
        </div>

        <hr style="border:none; border-top:1px solid #eee; margin:30px 0;" />

        <p style="font-size:12px; color:#aaaaaa; text-align:center;">
          Museo del Obrero – Cananea, Sonora<br/>
          Este mensaje fue enviado automáticamente. No responda a este correo.
        </p>
      </div>
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



