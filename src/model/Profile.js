// Esse arquivo é responsável pelos dados do perfil.

// Importando o confing da pasta db.

const Database = require('../db/config');

// O objeto data foi removido, porque agora os dados devem ficar no Banco de Dados.

// Esse objeto irá retornar os dados.
// Ele foi abilitado para exportação ao usar a propriedade esports.
// Passamos dentro dele a função get para pegarmos os dados da contante data.
// Para que os dados dejam atualizados, a função update foi criada.

module.exports = {

    // O nosso get vira async por conta do await.

    async get(){

        // Pegando os dados do banco de dados.

        const db = await Database();

        // Código SQL que irá trazer os meus dados do banco.
        // Quardando as informações do banco em uma constante.
        // Toda vez que for usar o banco vamos ter que usar o await.

        const data = await db.get(`SELECT * FROM profile`);

        // Fechando a aplicação do banco.

        await db.close();

        /*
            Aqui temos um impasse.
            Temos que decidir se os campos serão normalizados ou se o código entra no padrão do Bamco de dados.
            O banco não aceita - somente _ mas o código foi escrito com -.
            Ou seja, ou faz a normalização ou muda o código.
            Nesse caso vamos normalizar os dados.
            Na hora de retornar vamos passar os campos.
        */

        return {
            name: data.name, 
            avatar: data.avatar, 
            "monthly-budget": data.monthly_budget, 
            "days-per-week": data.days_per_week, 
            "hours-per-day": data.hours_per_day, 
            "vacation-per-year": data.vacation_per_year,
            "value-hour": data.value_hour
        };

    },

    async update(newData){
        
        // Abrindo conexão com o banco.

        const db = await Database();

        // Passando od dados que vão ser alterados.
        // Para passar o comando js dentro do comentário vamos usar o template string ${}.
        // Lembrar de passar os dados de string entre aspas duplas.

        await db.run(`UPDATE profile SET
        name = "${newData.name}",
        avatar = "${newData.avatar}",
        monthly_budget = ${newData["monthly-budget"]},
        days_per_week = ${newData["days-per-week"]},
        hours_per_day = ${newData["hours-per-day"]},
        vacation_per_year = ${newData["vacation-per-year"]},
        value_hour = ${newData["value-hour"]}
        `);

        // Fechando a aplicação do banco.

        await db.close();
    }
}