// Esse arquivo é responsável pelos dados do perfil.

/*
    O objeto data que estava no routes e dentro do objeto Profile,
    agora está dentro da pasta model dentro do arquivo Profile.

    O objeto literal virou a variável data.
*/

let data = {

    name: "Igor Tudisco",
    avatar: "https://avatars.githubusercontent.com/u/64790509?v=4",
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 4,
    "value-hour": 75

};

// Esse objeto irá retornar os dados.
// Ele foi abilitado para exportação ao usar a propriedade esports.
// Passamos dentro dele a função get para pegarmos os dados da contante data.
// Para que os dados dejam atualizados, a função update foi criada.

module.exports = {
    get(){
        return data;
    },

    update(newData){
        data = newData;
    }
}