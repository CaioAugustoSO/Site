import cors from 'cors'
import express, { application } from 'express'
import { routes } from './routes';

const app = express();

app.use(express.json());

;


// ele chama o metódo post para app e ao acessar o diretório /users dentro da porta ele criará uma requisição e resposta (req/res respectivamente) e retornará Hello World
//GET = Buscar informações
//POST = Cadastrar informações
//PUT = Atualizar informações de uma entidade
//PATCH = Atualizar uma informação única de uma entidade
//DELETE = Deletar uma informação
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, ()=> {

    console.log('Http server running');
});