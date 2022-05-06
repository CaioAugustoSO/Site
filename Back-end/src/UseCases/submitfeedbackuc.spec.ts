import { submitFeedback } from "./submitfeedbackuc";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitfeedbackuc = new submitFeedback(
    {create: createFeedbackSpy },
    {sendmail: sendMailSpy  }
)

describe('Submit feedback', ()=>{
    it('should be able to submit an feedback', async() =>{



       await expect(submitfeedbackuc.execute({
             type: 'BUG',
             comment: 'example coment',
             screenshot: 'data:image/png;base64,13412141241412'
        })).resolves.not.toThrow();
    });
    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
});
describe('Submit feedback', ()=>{
    it('should not to be able to submit an feedback without type', async() =>{
       await expect(submitfeedbackuc.execute({
             type: '',
             comment: 'example coment',
             screenshot: 'test.png'
        })).rejects.toThrow();
    });
    it('should not to be able to submit an feedback without comment', async() =>{
        await expect(submitfeedbackuc.execute({
              type: 'BUG',
              comment: '',
              screenshot: 'test.png'
         })).rejects.toThrow();
     });
     it('should not to be able to submit an feedback with an invalid screenshot', async() =>{
        await expect(submitfeedbackuc.execute({
              type: 'BUG',
              comment: 'ta tudo bugado!',
              screenshot: 'test.png'
         })).rejects.toThrow();
     });
});