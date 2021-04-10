// Esse arquivo é responsável por controlar o Job.

// Importando os dados do arquivo JobController.

const Job = require('../model/Job');

// Importando os controladores do arquivo JobController.

const JobUtils = require('../utils/jobUtils');

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

    // O get() virou async lá no model job.
    // Aqui ele vira await e o save async.

    async save(req, res) {

        // Passando a responsabilidade para o model.
        // Chamando o método create() para dar o push nos meus dados.
        // O banco de dados vai definir o meu id.

        await Job.create({
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now() // Atribuindo a data de hoje.
        });

        return res.redirect('/');
    },

    async show(req,res) {
        
        // Buscando os parâmetros da requisição.
        // O nome do parâmetro deve ser o mesmo da url do método post.

        const jobId = req.params.id;

        // Crianda uma váriavel get() para trazer os meus dados do job.

        const jobs = await Job.get();

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

        const profile = await Profile.get();

        // Passando o calculo do budget para o job
        // O Job.services virou o JobUtils

        job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);

        // Agora ele irá enviar para o meu template o job.

        return res.render("job-edit", { job });
    },

    async update(req, res) {

        // Procurando o Id e fazendo o teste com o mesmo igual na função show.

        const jobId = req.params.id;

        // Não preciso mais trazer os dados do job desse jeito.

        // Fazendo a atualização nos jobs.

        const updateJob = {
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"]
        };

        // Não preciso mais dessa verificação.

        // Chamando o meu método update() do Job.

        await Job.update(updateJob, jobId);

        res.redirect('/job/' + jobId);

    },

    async delete(req, res) {

        // Pegando o parâmetro id

        const jobId = req.params.id;

        // Passamos a responsabilidade de deletar para o model.
        // Chamando a propriedade delete.

        await Job.delete(jobId);

        // Retornando para a página inicinal

        return res.redirect('/');
    },
};

