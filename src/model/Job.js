// Esse arquivo é responsável pelos dados do Job.

/*
    Crindo um array para receber os meus jobs, que
    serão inviados pelo meu método POST abaixo.
    O data virou uma váriavel de data.
*/

let data = [

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
        "daily-hours": 3,
        "total-hours": 47,
        created_at: Date.now(),
        budget: 4500
    }
];

/*
    Passando os métodos get() e update() para que os dados sejam exportatos e atualizados.
    Foram criados também o método delete() e create() para que a responsabilidade de criar
    novos dados e deletar os antigos e errados fiquem no model.
*/
module.exports = {
    get() {
        return data;
    },

    update(newJob) {
        data = newJob;
    },

    delete(id) {

        // O finter vai funcionar de forma similar ao map e ao find.
        // A diferença é que o filte elimina os iguais.
        // Retorna um novo array que só terá os dados que ficaram na peneira.

        data = data.filter(job => Number(job.id) !== Number(id));
    },

    create(newJob) {
        
        data.push(newJob);

    },

};