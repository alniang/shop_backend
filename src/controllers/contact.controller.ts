import { Request, Response } from "express";
import nodemailer from "nodemailer";

export const sendMessage = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  // Traitement à faire (sauvegarde, envoi d’email, etc.)
  console.log("Message reçu:", { name, email, message });

  console.log("MAIL_USER:", process.env.MAIL_USER);
  console.log("MAIL_PASS:", process.env.MAIL_PASS);
  console.log("MAIL_DEST:", process.env.MAIL_DEST);

  // Envoi du message à l'adresse email du destinataire avec nodemailer
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS, // Utilise un mot de passe d'application si l'authentification à deux facteurs est activée
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.MAIL_DEST, // ton adresse de réception
      subject: `Nouveau message depuis le formulaire de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Nouveau message de contact
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> ${email}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #007bff;">
            <h3 style="color: #333; margin-top: 0;">Message :</h3>
            <p style="line-height: 1.6; color: #555;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 5px; font-size: 12px; color: #6c757d;">
            <p>Ce message a été envoyé depuis votre formulaire de contact le ${new Date().toLocaleString(
              "fr-FR"
            )}.</p>
          </div>
        </div>
      `,
      text: `
        Nouveau message de contact
        
        Nom: ${name}
        Email: ${email}
        
        Message:
        ${message}
        
        Envoyé le: ${new Date().toLocaleString("fr-FR")}
      `,
    });

    res
      .status(200)
      .json({ success: true, message: "Message envoyé avec succès." });
  } catch (error) {
    console.error("Erreur lors de l'envoi du message:", error);
    res.status(500).json({ error: "Erreur lors de l'envoi du message." });
  }
};
