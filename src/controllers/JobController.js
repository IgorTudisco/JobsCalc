// Esse arquivo é responsável por controlar o Job.

// Importando os dados do arquivo JobController.

const Job = require('../model/Job');

// Importando os controladores do arquivo JobController.

const JobUtils = require('../utils/JobUtils');

// Importando os dados do arquivo do Profile.

const Profile = require('../model/Profile');

/*
    O controle que estáva dentro do objeto literal job foi tranferido para esse arquivo.
    Aqui o controle virou o module.exports e já está abilitado para exportação.
*/

module.exports = {

    // O index foi enviado para o arquivo DashboardController.

    create(req, res) {
        return res.render("job");
    },

    save(req, res) {

        // Crinado uma váriavel get();

        const jobs = Job.get();

        // Id do array
        // O sinal de ? significa que ele irá testar se existe o id que eu estou procurando.

        const lastId = jobs[jobs.length - 1]?.id || 0;

                
        jobs.push({
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

        // Crianda uma váriavel get() para trazer os meus dados do job.

        const jobs = Job.get();

        // Usando o find para procurar o id dentro do nosso array.
        // Toda vez que ele encontrar o valor procurado ele vai executar a função dentro dele.
        // Os valores vindos da url vem no tipo string.
        // Para garantir que os dados são do tipo número vamos por Number nos dois.

        const job = jobs.find(job => Number(job.id) === Number(jobId)); 

        // Caso o job não seja encontrado, vamos passar uma mensagem.

        if(!job){
            return res.send('Job not found!');
        };
        
        // Criando uma constante para get() para trazer os meus dados do profile.

        const profile = Profile.get();

        // Passando o calculo do budget para o job
        // O Job.services virou o JobUtils

        job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);

        // Agora ele irá enviar para o meu template o job.

        return res.render("job-edit", { job });
    },

    update(req, res) {

        // Procurando o Id e fazendo o teste com o mesmo igual na função show.

        const jobId = req.params.id;

        // Criando uma constante para get() Para trazer os meus dados de job.

        const jobs = Job.get();

        const job = jobs.find(job => Number(job.id) === Number(jobId));

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
        // Criando uma constante com o meu novo job.

        const newJob = jobs.map(job => {

            if(Number(job.id) === Number(jobId)){

                job = updateJob;

            };

            return job;
        });

        // Chamando o meu método update() do Job.

        Job.update(newJob);

        res.redirect('/job/' + jobId);

    },

    delete(req, res) {

        // Pegando o parâmetro id

        const jobId = req.params.id;

        // Passamos a responsabilidade de deletar para o model.
        // Chamando a propriedade delete.

        Job.delete(jobId);

        // Retornando para a página inicinal

        return res.redirect('/');
    },
};

