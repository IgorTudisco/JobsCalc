// Esse aquivo é responsável pelas alterações da página inícial.

// Importando os dados do job.

const Job = require('../model/Job');

// Importando o JobUtils.

const JobUtils = require('../utils/jobUtils');

// Importando o Profile.

const Profile = require('../model/Profile');

/*
    O index foi trazido para esse arquivo, pois o mesmo altera as informações iniciais.
    O mesmo foi colocado dentro do modeus para ser esportado para outros arquivos.
*/

module.exports = {

    /*
        Como o meu get() virou async lá no model Profile.
        Ao chamar essa função ele deve ter um await.
        E toda função await tem que está dentro de um async.
    */

    async index(req, res) {

        // Como os dados estão em outro arquivo temos que chamar a função get.
        // Para facilitar vamos criar um constante contendo os meus dados do Job e outra do Profile.
        // Essa constante vai se tranformar em um array pois os nossos dados vem dentro de um array.

        const jobs = await Job.get();
        const profile = await Profile.get();

        // Criando a contagem do estatos dos jobs.
        // Esse objeto conterá o meu estato e vai me retornar o estatus dos jobs.

        let statusCount = {

            // Quantidade de trabalhos em andamento.

            progress: 0,

            // Quantidade de trabalhos feitos.

            done: 0,
            
            // Quantidade de trabalhos.

            total: jobs.length

        };

        // Criando a váriavel jobTotalHours que conterá a quantidade de hora/dia dos jobs in progress.

        let jobTotalHours = 0;

        // Criando um novo array com map, passando o array jobs como base.

        const updatedJobs = jobs.map((job) => {

            // Chamando a função que calcula os dias.
            // O Job.services virou Utils.

            const remaining = JobUtils.remainingDays(job);

            // Estatus de acondo os dias restantes.
            // Usando um if ternário

            const status = remaining <= 0 ? 'done' : 'progress';

            /*
                Chamando o objeto statusCount para fazer o cálculo da
                quantidade de trabalho que estão em andamento e os que estão feitos.

                Ao passar statusCount[..index..] ele irá retornar o valor que está dentro daquela
                variável. Pois primeiro ele busca o meu objeto e depois a variável que está dentro dele.

                Ao retornar o valor ele irá somar mais um me retornando a quantidade de cada um.
            */

            statusCount[status] += 1;

            // Contando a quantidade de horas de trabalho.
            // Somando se tiver com o estátus em progresso.
            // Tranformando o job['daily-hours'] em número.
            /*
            if(status === 'progress'){

                jobTotalHours += Number(job['daily-hours']);

            };
            */
           // Usando um ternário.

            jobTotalHours = status === 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours;

            // Retornando o novo array.

            return {
                ...job,
                remaining,
                status,

                // O Job.services virou JobUtils.
                // O Profile.data virou profiles

                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            };
        });

        // Fazendo os cálculos das horas livres.
        // Qtd de horas que quero trabalhar Menos a quantidade de horas/dia de cada job em progress.

        const freeHours = profile["hours-per-day"] - jobTotalHours;

        // Passando profile para a página index.
        // O segundo profile se refere ao profile.get().
        // Passando os estatus para a página index.
        // Passando as horas livres.

        return res.render("index", {
            jobs: updatedJobs,
            profile: profile,
            statusCount: statusCount,
            freeHours: freeHours
        });
    },
};
