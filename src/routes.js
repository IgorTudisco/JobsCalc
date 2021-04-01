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

const views = __dirname + "/views/"

/*
    Crindo um objeto literal.
    É uma boa prática criar o objeto com a primeira letra maiúscula.

    O data terá os meus dados teste. Nesse caso o data não será um array.
*/

const Profile = {
    data: {

        name: "Igor Tudisco",
        avatar: "https://avatars.githubusercontent.com/u/64790509?v=4",
        "monthly-budget": 3000,
        "hours-per-day": 5,
        "days-per-week": 5,
        "vacation-per-year": 4,
        "value-hour": 75

    },

    controllers: {

        index(req, res) {
            return res.render(views + "profile", { profile: Profile.data });
        },

        update(req, res){

            /*
                Temos que pegar o req.body.
                O ano tem 52 semanas.
                Remover as semanas de férias do ano.
                Quantas horas por semana estou trabalhando.
                Total de horas trabalhadas no mes.
                Valor da minha hora.
            */
           const data = req.body;

           const weekPerYear = 52;

           const weekPerMonth = (weekPerYear - data["vacation-per-year"]) / 12;

           const weekTotalHous = data["hours-per-day"] * data["days-per-week"];

           const monthlyTotalHous = weekTotalHous * weekPerMonth;

           const valueHour = data["monthly-budget"] / monthlyTotalHous;

           Profile.data = {
               ...Profile.data,
               ...req.body,
               "value-hour": valueHour
           };
           
           return res.redirect('/profile');

        },
    },
};

/*
    Criando um objeto literal.

    Terá o array data que conterá os meus dados iniciais.

    Essa função terá um controlador que irá gerenciar a função index.
    A função index fica responsável por executar o update do nosso array.

    A função criate fica responsável por renderizar o meu job.

    Criamos a função save que fica respnsável por dar um push no meu job.

    Afunção show tem como objetivo levar os dados para a página de edição.
    
    O nosso objeto também terá a função service, que será responsável
    pela função remainingDays.

*/

const Job = {
            
    /*
        Crindo um array para receber os meus jobs, que
        serão inviados pelo meu método POST abaixo.
    */

    data: [

        // Dados do html para teste.

        {
            id: 1,
            name: "Pizzaria Gulozo",
            "daily-hours": 2,
            "total-hours": 1,
            created_at: Date.now(),
            budget: 4500
        },
        {
            id: 2,
            name: "OneTwo",
            "daily-hours": 2,
            "total-hours": 47,
            created_at: Date.now(),
            budget: 4500
        }
    ],

    controllers: {
        index(req, res) {

            // Criando um novo array com map, passando o array jobs como base.

            const updatedJobs = Job.data.map((job) => {

                // Chamando a função que calcula os dias.

                const remaining = Job.services.remainingDays(job);

                // Estatus de acondo os dias restantes.
                // Usando um if ternário

                const status = remaining <= 0 ? 'done' : 'progress';

                return {
                    ...job,
                    remaining,
                    status,
                    budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
                };
            });

            return res.render(views + "index", { jobs: updatedJobs });
        },

        create(req, res) {
            return res.render(views + "job");
        },

        save(req, res) {
            
            // Id do array
            // O sinal de ? significa que ele irá testar se existe o id que eu estou procurando.

            const lastId = Job.data[Job.data.length - 1]?.id || 0;

                    
            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now() // Atribuindo a data de hoje.
            });

            return res.redirect('/');
        },

        show(req,res) {
            
            // Buscando os parâmetros da requisição.
            // O nome do parâmetro deve ser o mesmo da url do método post.

            const jobId = req.params.id;

            // Usando o find para procurar o id dentro do nosso array.
            // Toda vez que ele encontrar o valor procurado ele vai executar a função dentro dele.
            // Os valores vindos da url vem no tipo string.
            // Para garantir que os dados são do tipo número vamos por Number nos dois.

            const job = Job.data.find(job => Number(job.id) === Number(jobId));

            // Caso o job não seja encontrado, vamos passar uma mensagem.

            if(!job){
                return res.send('Job not found!')
            };
            
            // Passando o calculo do budget para o job

            job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"]);

            // Agora ele irá enviar para o meu template o job.

            return res.render(views + "job-edit", { job });
        },

        update(req, res) {

            // Procurando o Id e fazendo o teste com o mesmo igual na função show.

            const jobId = req.params.id;

            const job = Job.data.find(job => Number(job.id) === Number(jobId));

            if(!job){
                return res.send('Job not find');
            };

            // Fazendo a atualização nos jobs.

            const updateJob = {
                ...job,
                name: req.body.name,
                "total-hours": req.body["total-hours"],
                "daily-hours": req.body["daily-hours"]
            };

            // O map vai verificar se teve alguma alteração no meu array.

            Job.data = Job.data.map(job => {

                if(Number(job.id) === Number(jobId)){

                    job = updateJob;

                };

                return job;
            });

            res.redirect('/job/' + jobId);

        },

        delete(req, res) {

            // Pegando o parâmetro id

            const jobId = req.params.id;

            // O finter vai funcionar de forma similar ao map e ao find.
            // A diferença é que o filte elimina os iguais.
            // Retorna um novo array que só terá os dados que ficaram na peneira.

            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId));

            // Retornando para a página inicinal

            return res.redirect('/');
        },
    },
    
    services: {
                
        // Função para calculo de data.

        remainingDays(job) {
                            
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
        },

        calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
    }
};

// Apontando para a função controladora index do Job.

routes.get('/', Job.controllers.index);

// Apontando para a função controladora create do Job.

routes.get('/job', Job.controllers.create);

// Aponta par a função controladora create do Job
// Passando o Id no url da edição.
// O '/job/edit' vira '/job/:id.
// O nome escolhido tem que ser o mesmo da requisição, que está dentro do método show.

routes.get('/job/:id', Job.controllers.show);

// Apontando para a função controladora update do job.

routes.post('/job/:id', Job.controllers.update);

// Apontando para a função controladora delete do job.

routes.post('/job/delete/:id', Job.controllers.delete);

// Apontando para a função controladora index do Profile.

routes.get('/profile', Profile.controllers.index);

// Fará o update do profile.

routes.post('/profile', Profile.controllers.update);

// Método post
// Enviando os dados para o array data dentro do Job
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

// Apontando para a função controladora save do Job.

routes.post('/job', Job.controllers.save);

// Vamos jogar a rota para fora usando a propríedade abaixo.

module.exports = routes;