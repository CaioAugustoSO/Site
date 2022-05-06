import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { feedbackType, feedbacktypes } from "..";
import { CloseButton } from "../../CloseButton"
import { Screenshotbutton } from "../Screenshotbutton";

interface FeedbackcontentStepProps{
    feedbacktype: feedbackType  ;
    onfeedbackrestartrequested: () =>void
    onfeedbackSent: () =>void
}
export function FeedbackcontentStep({ 
    feedbacktype,
    onfeedbackrestartrequested,
    onfeedbackSent, 
}:FeedbackcontentStepProps ){

    const [Screenshot, setScreenshot] = useState<string | null>(null)
    const[comment, setcomment] = useState('');

    const feedbacktypeinfo = feedbacktypes[feedbacktype];

    function handleSubmitFeedback(event: FormEvent){
        event.preventDefault();
        console.log({
            Screenshot,
            comment,
        })
        onfeedbackSent();
    }

    return(
<>
        <header>
            <button type="button" 
            className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
            onClick={onfeedbackrestartrequested}
            >
                <ArrowLeft weight="bold" classname="w-4 h-4" />
            </button>
        <span className="text-xl leading-6 flex items-center gap-2">
            <img src={feedbacktypeinfo.image.source} alt={feedbacktypeinfo.image.alt} className="w-6 h-6" />
            {feedbacktypeinfo.title}</span>
        <CloseButton />
        </header>
<form onSubmit={handleSubmitFeedback} className="my-4 w-full">
<textarea
className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-400 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500  focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
placeholder="Conte com detalhes o que está acontecendo"
onChange={event => setcomment(event.target.value)}
/>
<footer className="flex gap-2 mt-2">
<Screenshotbutton 
screenshot ={Screenshot}
onScreenshotTook = {setScreenshot}

/>
    <button
    type="submit"
    className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:"
    disabled={comment.length == 0}
    >
        Enviar Feedback
    </button>
</footer>
</form>
</>
    )
}