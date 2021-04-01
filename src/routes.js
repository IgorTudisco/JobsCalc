// Criando um novo require

const { req, res } = require('express');
const express = require('express');

// Agora vamos pegar uma função do express chamada routes.

const routes = express.Router();

/*
    Os browses tem a função get/ por isso devemos usar o argumento get.
    O get recebe como o primeito argumento a barra, para que quando ele
    ver a barra do navegador ele execute o segundo argumento que nesse caso
    está vindo como uma função.

    (Para rodar o servidor usamos o comando node (caminho do servidor e o nome dele),
    para parar/desligar o seridor damos o comando ctrl c. Salvamos as nossas alterações e
    rodamos novamente.
    O return dentro do get irá responder/exibir para o usuário no front-end.
    Quem vai fazer essa brincadeira de pedidos e respostas é o responde, res. Os
    mesmos são passados como parametros da função.)
*/
/*
    Crindo uma váriavel de ambiente.
    Essa váriavel é o caminho em comu dos meus arquivos.
    Por padrão o template ejs ler a pasta views.
    Por isso é uma boa pratica criar a pasta views.
    Assim não precisamos mais da váriavel de ambiente.
    const basePath = __dirname + "/views";

    Porém ele está achando que a minha pasta viu está no meu diretório raiz,
    assim vamos corrigir esse erro usando o comando abaixo.
*/

const view = __dirname + "/views/";

// Dados

const profile = {
    name: "Igor Tudisco",
    avatar: "https://avatars.githubusercontent.com/u/64790509?v=4",
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 4,
    "value-hour": 75

};

/*
    Crindo um array para receber os meus jobs, que
    serão inviados pelo meu método POST abaixo.
*/

// Dados do html para teste.

const jobs = [{
    id: 1,
    name: "Pizzaria Gulozo",
    "daily-hours": 2,
    "total-hours": 1,
    created_at: Date.now()
},
{
    id: 2,
    name: "OneTwo",
    "daily-hours": 2,
    "total-hours": 47,
    created_at: Date.now()
}];

// Id do array
// O sinal de ? significa que ele irá testar se existe o id que eu estou procurando.

const lastId = jobs[jobs.length - 1] ?.id || 1;

// Função para calculo de data.

function remainingDays(job){
                    
    // Ajustando o job.
    // Calculo de tempo restante.

    const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();

    const createdDate = new Date(job.created_at);

    const dueDay = createdDate.getDate() + Number(remainingDays);
    
    const dueDateInMs = createdDate.setDate(dueDay);

    // Tempo restante.

    const timeDiffInMs = dueDateInMs - Date.now();

    // Transformando milli segundos em days.

    const dayInMs = 1000 * 60 * 60 * 24;

    // O Math.floor() vai arredondar para baixo.

    const dayDiff = Math.floor(timeDiffInMs / dayInMs);
    
    // restam x days
    
    return dayDiff;
};

// req, res.
routes.get('/', (req, res) => {

    // É uma boa pratica usar o caminha abisoluto do arquivo.
    // Podemos usar o comando pwd no terminal para descobrir o caminho.
    // return res.render("c:/maratona/index.html")

    /*
        A propriedade __dirname traz o caminho do meu diretório.
        Assim a escrita fica mais simples.
        Passando os jobs para dentro da requisição.
    */

    // Criando um novo array com map, passando o array jobs como base.

    const updatedJobs = jobs.map((job) => {

        // Chamando a função que calcula os dias.

        const remaining = remainingDays(job);

        // Estatus de acondo os dias restantes.
        // Usando um if ternário

        const status = remaining <= 0 ? 'done' : 'progress';

        return {
            ...job,
            remaining,
            status,
            budget: profile["value-hour"] * job["total-hours"]
        };
    });

    return res.render(view + "index", { jobs: updatedJobs });
});

// Criando as novas rotas.
// Como só temos uma linha de código podemos simplificala ao máximo.
// Esse só é um novo jeito de escrever o código acima.
// Mudamos de senFile para render, porque vamos usar o template ejs pata renderizar o html.

// antes do templete
// routes.get('/job', (responde, res) => res.sendFile(basePath + "/job.html"));

routes.get('/job', (req, res) => res.render(view + "job"));

routes.get('/job/edit', (req, res) => res.render(view + "job-edit"));

// Ao passar o nome da váriavel igual o nome da propriedade
// Posso passar somente o nome da propriedade

routes.get('/profile', (req, res) => res.render(view + "profile", { profile }));

// Método post
// Enviando os dados para o array jobs
// Ápos o envio dos dados vamos ser redirecionados a página principal.
/*
    Referência dos dados:
    req.body={ name: 'App Aventura', 'daily-hours': '5', 'total-hours': '100' }
    Atribuindo a data de hoje e fazendo o calculo do tempo.
    Aváriavel job será o nosso recurso/entidade e vamos passar atributos para ele.
    {   
    const job = req.body;
    job.created_at: Date.now();
    }
*/
routes.post('/job', (req, res) => {

    jobs.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now()
    });

    return res.redirect('/');
});

// Vamos jogar a rota para fora usando a propríedade abaixo.

module.exports = routes;