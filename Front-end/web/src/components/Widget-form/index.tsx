import { CloseButton } from "../CloseButton";
import bugImageUrl from'../../assets/bug.svg'
import ideaImageUrl from'../../assets/idea.svg'
import thoughtImageUrl from'../../assets/thought.svg'
import { useState } from "react";
import { FeedbacktypeStep } from "./Steps/FeedbacktypeStep";
import { FeedbackcontentStep } from "./Steps/FeedbackcontentStep";
import { FeedbacksuccessStep } from "./Steps/FeedbacksuccessStep";
 
export const  feedbacktypes ={
    BUG:{
        title:'Problema',
        image: {    
        source: bugImageUrl,
        alt:'Inseto'
        },
    },
    IDEA:{
        title:'Ideia',
        image:{
        source: ideaImageUrl,
        alt:'Lanterna'
        },
    },
    OTHER:{
        title:'Outro',
        image:{
        source: bugImageUrl,
        alt:'Balão de chat'
        },
    },
};
//keyof retorna todas as "chaves" do objeto, assim como o typeof retorna os tipos do mesmo convertidos para que possa ser usado no useState

export type feedbackType = keyof typeof feedbacktypes;

//Object.entries(feedbackTypes(nome do objeto criado para tipos de feedback)) => 
/**
 * [ ['BUG', {image}], 
 * ['IDEA', {image}], 
 * ['OTHER', {image}] 
 * ] (criou uma "array de arrays")
 **/
export function WidgetForm(){
    //objeto retornna o estado de feedbacktype caso seja selecionado, caso não retorna nulo
    const[feedbackType, setfeedbackType] = useState<feedbackType | null>(null)
    const[feedbackSent, setfeedbackSent] = useState(false);
    function handleRestartFeedback(){
        setfeedbackSent(false);
        setfeedbackType(null);
    }

    return(
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg  w-[calc(100vw-2rem)] md:w-auto">
     {feedbackSent? (
         <FeedbacksuccessStep onfeedbackrestartrequested={handleRestartFeedback}/>
     ):(
         <>
         {!feedbackType ?(
           //componente feedbacktypeStep mandará a função para ele, que ao pressionar o botão será chamada a função onFeedbackTypeChanged que é a mesma da linha 44
         <FeedbacktypeStep onFeedbackTypeChanged={setfeedbackType}/>
        ) : (
            <FeedbackcontentStep
             feedbacktype={feedbackType}
             onfeedbackrestartrequested={handleRestartFeedback}
             onfeedbackSent={() => setfeedbackSent(true)}
            />
        )}
         </>
     )} 

       <footer className="text-xs text-neutral-400">
        Feito com ❤ por <a className="underline underline-offset-2">Caio Augusto</a>
        </footer>
    </div>     
    );

} 

