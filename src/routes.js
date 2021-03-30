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
    Quem vai fazer essa brincadeira de pedidos e respostas é o responde, response. Os
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

const view = __dirname + "/views/";

// Dados

const profile = {
    name: "Igor Tudisco",
    avatar: "https://avatars.githubusercontent.com/u/64790509?v=4",
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 4
}

// request, response.
routes.get('/', (req, res) => {

    // É uma boa pratica usar o caminha abisoluto do arquivo.
    // Podemos usar o comando pwd no terminal para descobrir o caminho.
    // return response.render("c:/maratona/index.html")

    /*
        A propriedade __dirname traz o caminho do meu diretório.
        Assim a escrita fica mais simples.
    */
    return res.render(view + "index");
});

// Criando as novas rotas.
// Como só temos uma linha de código podemos simplificala ao máximo.
// Esse só é um novo jeito de escrever o código acima.
// Mudamos de senFile para render, porque vamos usar o template ejs pata renderizar o html.

// antes do templete
// routes.get('/job', (responde, response) => response.sendFile(basePath + "/job.html"));

routes.get('/job', (req, res) => res.render(view + "job"));

routes.get('/job/edit', (req, res) => res.render(view + "job-edit"));

// Ao passar o nome da váriavel igual o nome da propriedade
// Posso passar somente o nome da propriedade

routes.get('/profile', (req, res) => res.render(view + "profile", { profile }));

// Vamos jogar a rota para fora usando a propríedade abaixo.

module.exports = routes;