import express from 'express';
import { NodemailerMailAdapter } from './Nodemail/nodemail-mailer-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/primsa-feedback-repositories';
import { submitFeedback } from './UseCases/submitfeedbackuc';



export const routes = express.Router()



routes.post('/feedbacks', async (req,res) => {
    //cria uma desestruturação para que req.body recebea type,comment,screenshot, e na linha subsequente usa prisma para mandar ao banco, com o prefixo await para que espere que o banco receba os dados antes de ser mandado outro "sinal"
    const { type,comment,screenshot } = req.body; 


    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter()

    const submitfeedbackuc = new submitFeedback(
        prismaFeedbacksRepository,
        nodemailerMailAdapter,
    )
    await  submitfeedbackuc.execute({
        type,
        comment,
        screenshot,
    })

//retrona o status 201 (criado) como json para a tabela feedback usando o prisma
    return res.status(201).send()
});