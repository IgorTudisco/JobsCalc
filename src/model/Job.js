// Esse arquivo é responsável pelos dados do Job.

// Importando o db.

const Database = require('../db/config');

// Os dados foram apagados do código, pois agora eles vão vir do banco.

/*
    Passando os métodos get() e update() para que os dados sejam exportatos e atualizados.
    Foram criados também o método delete() e create() para que a responsabilidade de criar
    novos dados e deletar os antigos e errados fiquem no model.
*/
module.exports = {

    // Quando usamos o banco de dados as funções virão async
    // Usamos o await para espera a exacução de alguma função do banco.

    async get() {

        // Abrindo a conexão com o banco.
        
        const db = await Database();

        // Como o get só traz um dado, temos que usar o all para trazer todos os dados.

        const jobs = await db.all(`SELECT * FROM jobs`);

        // Fechando o banco.

        await db.close();

        /*
            Como temos mais de um job no banco de dados, vamos usar o map para criar
            um novo array e fazer a nossa normalização.
            Aqui os dados serão chamados de jobs e é passado o comando
            `SELECT * FROM jobs` para mostrar/pegar os dados do banco.
            No map() devemos passar todos os campos e os seus respectivos correspondentes.
        */

        return jobs.map(job => ({
            id: job.id,
            name: job.name,
            "daily-hours": job.daily_hours,
            "total-hours": job.total_hours,
            created_at: job.created_at
        }));
    },

    async update(updatedJob, jobId) {

        // Iniciando o banco de dados.

        const db = await Database();

        // Passando o comando UPDATE
        /*
            Respeitando a regra do banco de dados
            de sempre que se for fazer uma alteração devemos passar
            um Where, assim não corremos o risco de alterar algo errado.
        */

        await db.run(`UPDATE jobs SET
        name = "${updatedJob.name}",
        daily_hours = ${updatedJob["daily-hours"]},
        total_hours = ${updatedJob["total-hours"]}
        WHERE id = ${jobId}
        `);

        // Fechando o banco de dados.

        await db.close();

    },

    async delete(id) {

        // Agora o delete vai ser feito pelo danco de dados e não mais pelo filte().

        // Abrindo a conexão com o banco de dados.

        const db = await Database();

        /*
            Passando o comando de DELETE FROM pata o run().
            Lembrar sempre da regra do banco de dados, que é sempre passar o lugar do delete,
            para evitar erros temos que fazer esse filtro.
            Quem faz esse filtro é o WHERE. 
        */

        await db.run(`DELETE FROM jobs WHERE id = ${id}`);

        // Fechando a conexão com o banco de dados.

        await db.close();

    },

    async create(newJob) {
        
        // Abrindo a conexão com o banco.

        const db = await Database();

        await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
            ) VALUES (
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob.created_at}
        )`)

        // Fechando o banco.

        await db.close();

    },

};