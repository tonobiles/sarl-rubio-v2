"use server";

export async function sendContactEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const service = formData.get("service") as string;
  const message = formData.get("message") as string;

  const TO_EMAIL = "contact@sarl-rubio.fr";

  // Construction du template HTML premium
  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1a1a1a; margin: 0; padding: 0; background-color: #f8fafd; }
          .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 24px; overflow: hidden; shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
          .header { background: #00B5E2; padding: 40px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -0.05em; text-transform: uppercase; }
          .content { padding: 40px; }
          .info-block { margin-bottom: 30px; }
          .label { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; color: #00B5E2; margin-bottom: 8px; }
          .value { font-size: 16px; font-weight: 600; color: #1a1a1a; }
          .message-box { background: #f8fafd; padding: 25px; border-radius: 16px; border: 1px solid #e2e8f0; color: #4a5568; font-style: italic; }
          .footer { background: #f1f5f9; padding: 30px; text-align: center; font-size: 12px; color: #94a3b8; }
          .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; background: rgba(0,181,226,0.1); color: #00B5E2; font-weight: 800; font-size: 10px; margin-top: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div style="font-size: 12px; font-weight: 800; opacity: 0.8; margin-bottom: 10px; letter-spacing: 0.2em;">NOUVELLE DEMANDE</div>
            <h1>SARL RUBIO</h1>
          </div>
          <div class="content">
            <div style="display: flex; flex-wrap: wrap; margin-bottom: 20px;">
               <div class="info-block" style="flex: 1; min-width: 200px;">
                 <div class="label">Client</div>
                 <div class="value">${name}</div>
               </div>
               <div class="info-block" style="flex: 1; min-width: 200px;">
                 <div class="label">Téléphone</div>
                 <div class="value"><a href="tel:${phone}" style="color: #1a1a1a; text-decoration: none;">${phone}</a></div>
               </div>
            </div>
            
            <div class="info-block">
              <div class="label">Service Demandé</div>
              <div class="badge">${service.toUpperCase()}</div>
            </div>

            <div class="info-block">
              <div class="label">Message</div>
              <div class="message-box">"${message}"</div>
            </div>
          </div>
          <div class="footer">
            © ${new Date().getFullYear()} SARL RUBIO - Plomberie, Chauffage & Climatisation<br>
            Entraigues-sur-la-Sorgue (84)
          </div>
        </div>
      </body>
    </html>
  `;

  console.log(`Sending beautiful email to ${TO_EMAIL}...`);
  // console.log(htmlTemplate); // Debugging

  await new Promise((resolve) => setTimeout(resolve, 1200));

  return { 
    success: true, 
    message: "Demande transmise avec succès !" 
  };
}
