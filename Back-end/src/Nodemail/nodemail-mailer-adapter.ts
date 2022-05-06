import { MailAdapter, SendMailData } from "../adapters/mail-adapter";
import nodemailer from 'nodemailer'
const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "171455306bf922",
      pass: "f65d898f2bd531"
    }
  })




export class NodemailerMailAdapter implements MailAdapter{
    async sendmail({subject,body}: SendMailData){
    await transport.sendMail({
        from: 'Equipe Canho<canho@fidget.com>',
        to: 'Caio Augusto <caioaugustoso@hotmail.com',
        subject,
        html: body,
    });
    };
}