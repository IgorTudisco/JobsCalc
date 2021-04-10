// Esse quivo é responsável por iniciar o nosso banco de dados.
// Ele vái criar o nosso arquivo de banco dedos.
// Ele será rodado apenas uma vez.

// Importando o config.

const Database = require('./config.js');

/*
    Para usar a propriedade await, devemos colocala dentro de um async.
    Por isso vamos criar uma função asicrona para que a mesma execute um
    por cada vez até todas serem executatas.
    Mas para isso funcionar meus await devem estar dentro do async.
    Vamos por essa função dentro de uma constante.
    Vamos criar toda essa estrutura para que se possa envolver todos os
    nossos comandos em um async/await.
*/

const initDb = {

    // Criando a função async.
    // Agora os meus await vão funcionar adequadamente.

    async init() {

        // Chamando a Database.
        // Essa função tem a funcionalidade de abrir a porta do meu banco.
        // Quardando essa função dentro de uma constante.

        const db = await Database();

        // Essa função vai executar o meu banco.
        // Vamos usar os comandos do SQL.
        // Temos que usar as crases (`...`) para que o Js aceite o mode de escrita do SQL.
        // Os comando do SQL seram escritos em caixa alta.
        // É ele quem vai passar os comandos para o driver.
        // Criando a tabela profile.

        await db.exec(`CREATE TABLE profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT, 
            avatar TEXT, 
            monthly_budget INT, 
            days_per_week INT,
            hours_per_day INT,
            vacation_per_year INT,
            value_hour INT
        )`);

        // Criando a tabela jobs.

        await db.exec(`CREATE TABLE jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT, 
            daily_hours INT,
            total_hours INT,
            created_at DATETIME
        )`);

        // Inserindo os dados no banco de dados.
        // Colocando os dados na tabela profile.
        // O run vai rodar a tabela.

        await db.run(`INSERT INTO profile (
            name, 
            avatar, 
            monthly_budget, 
            days_per_week, 
            hours_per_day, 
            vacation_per_year,
            value_hour
         ) VALUES (
             "Igor",
             "https://avatars.githubusercontent.com/u/64790509?v=4",
             3000,
             5,
             5,
             4,
             70
        );`);

        // Inserindo os dados na tabela jobs

        await db.run(`INSERT INTO jobs (
            name, 
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "Pizzaria Guloso",
            2,
            1,
            1617514376018
        );`);
        
            await db.run(`INSERT INTO jobs (
            name, 
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "OneTwo Projects",
            3,
            47,
            1617514376018
        );`);

        // Essa função irá fechar o meu banco.

        await db.close();

    },
};

// Chamando a função init.

initDb.init();