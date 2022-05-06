import { feedbackType, feedbacktypes } from ".."
import { CloseButton } from "../../CloseButton";
//dizer ao programa que FeedbacktypeStep recebe propriedades
interface FeedbacktypeStepprops {
    onFeedbackTypeChanged: (type:feedbackType) => void;
}

export function FeedbacktypeStep({onFeedbackTypeChanged}:FeedbacktypeStepprops){
    return( 
        <>
            <header>
            <span className="text-xl leading-6"></span>
            <CloseButton />
            </header>
    <div className="flex py-8 gap-2 w-full">
    { Object.entries(feedbacktypes).map(([key, value]) =>{
        return(
            <button
            //key vai retornar a "chave" de cada um dos elementos do objeto feito como BUG,IDEA,OTHER para poder diferencia-los caso contarrio são todos iguais
            key={key}
              className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
              //ao passar uma ação você não pode passar a execução da mesma (setfeedbackType(key)) como feita abaixo, a não ser que tenha a exceção da "arrow function(() =>" e para o mesmo poder entender que aquilo é apeans um feedbackType, você "seta" ela como o mesmo
              onClick={() => onFeedbackTypeChanged(key as feedbackType)}
              type="button"
            >
                <img src={value.image.source} alt={value.image.alt} />
                <span>
                    {value.title}
                </span>
            </button>
    )
    }) }
        </div>
    </>
    )
}