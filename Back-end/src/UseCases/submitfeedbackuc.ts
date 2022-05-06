import { runInThisContext } from "vm";
import { MailAdapter } from "../adapters/mail-adapter";
import { feedbacksRepository } from "../repositories/feedbacks";

interface submitfeedbackuc{
    type:string;
    comment:string;
    screenshot?: string;
}

export class submitFeedback{
    constructor(
        private feedbackrepository: feedbacksRepository,
        private mailAdapter: MailAdapter,
    ){}

    async execute(request: submitfeedbackuc){
        const{ type,comment,screenshot } = request;


        if(!comment){
            throw new Error('Relate seu erro!')

        }

        if(!type){
            throw new Error('Tipo de feedback requerido')

        }


        if(screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error('Arquivo inválido')
        }



        await this.feedbackrepository.create({
            type,
            comment,
            screenshot,
        });
        await this.mailAdapter.sendmail({
            subject: `Novo Feedback`,
            body:
            [
            `<div style="font-family: sans-seriff; font-size: 16px; color: #111;">`,
            `<p>Tipo do feedback: ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            `</div>`
        ].join('\n')
        })
    }
}