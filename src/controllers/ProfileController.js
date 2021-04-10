// Esse arquivo é responsável pelos controles do perfil.

// Importando os dados do model.

const Profile = require('../model/Profile');

/*
    O controle index e update que estava no routes e dentro do objeto Profile,
    agora está dentro da pasta controllers dentro do arquivo ProfilleControler.

    O controller aqui dentro virou module.exports.

    O exports faz com que o tudo e qualquer coisa que esteja dentro dele seja exportável.
    Assim podemos aproveitar ele em outros aquivos.
*/

module.exports = {

    /*
        Como o meu Profile.get() e o Profile.update() virarão async lá no model Profile.
        Ao chamar essa função ele deve ter um await.
        E toda função await tem que está dentro de um async.
    */

    async index(req, res) {

        /*
            Para que os dados sejam inseridos devemos chamar a função get,
            que foi criada dentro do arquivo Profile que está na pasta mode.            
        */

        return res.render("profile", { profile: await Profile.get() });
    },

        async update(req, res){

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

        // Os ... é chamado de espalhar/spread.

        /*
            O primeito Profile.data é um objeto novo que conterá os novos dados trazidos
            pela requisição req.body.
            É nele que o update acontece.
            Já o segundo Profile.data se refere aos dados do meu array mais antigo.
            Por isso mudamos o segundo e não o primeiro para Profile.get().
        */

        /*
            Como os dados estão vindo de fora.
            Temos que pedir uma altorização para fazer as alteração que queremos.
            Desse modo passamos os dados que serão alterados para dentro. Os mesmos serão usados
            como parâmetros da nova função.
            Passando as informações para a constante.
        */

        const profile = await Profile.get();

        await Profile.update({
            ...profile,
            ...req.body,
            "value-hour": valueHour
        });

        return res.redirect('/profile');

    }
}