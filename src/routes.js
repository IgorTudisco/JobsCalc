// Esse arquivo é responsável pelas rotas.

// Criando um novo require

const { req, res } = require('express');
const express = require('express');

// Agora vamos pegar uma função do express chamada routes.

const routes = express.Router();

// Importando o controlador do profile.

const ProfileController = require('./controllers/ProfileController');

// Importando o controlador do job

const JobController = require('./controllers/JobController');

// Importando o DashboardController

const DashboardController = require('./controllers/DashboardController');


/*
    Os browses tem a função get/ por isso devemos usar o argumento get.
    O get recebe como o primeito argumento a barra, para que quando ele
    ver a barra do navegador ele execute o segundo argumento que nesse caso
    está vindo como uma função.

    (Para rodar o servidor usamos o comando node (caminho do servidor e o nome dele),
    para parar/desligar o seridor damos o comando ctrl c. Salvamos as nossas alterações e
    rodamos novamente.
    O return dentro do get irá responder/exibir para o usuário no front-end.
    Quem vai fazer essa brincadeira de pedidos e respostas é o req, res. Os
    mesmos são passados como parametros da função.)
*/

// O objeto literal Profile.data foi movido para a pasta model e agora está no aquivo Profile.

// O objeto lieral Profile.controller foi movido para a pasta controllers e agora está no aquivo ProfileController.

// O objeto literal job foi fatorado em controle, Util e model.

// Apontando para a função controladora index do DashboardController.

routes.get('/', DashboardController.index);

// Apontando para a função controladora create do JobController.

routes.get('/job', JobController.create);

// Aponta para a função controladora create do JobController.
// Passando o Id no url da edição.
// O '/job/edit' vira '/job/:id.
// O nome escolhido tem que ser o mesmo da requisição, que está dentro do método show.

routes.get('/job/:id', JobController.show);

// Apontando para a função controladora update do JobController.

routes.post('/job/:id', JobController.update);

// Apontando para a função controladora delete do JobController.

routes.post('/job/delete/:id', JobController.delete);

// Método post
// Enviando os dados para o array data dentro do Job
// Ápos o envio dos dados vamos ser redirecionados a página principal.
/*
    Referência dos dados:
    req.body={ name: 'App Aventura', 'daily-hours': '5', 'total-hours': '100' }
    Atribuindo a data de hoje e fazendo o calculo do tempo.
    Aváriavel job será o nosso recurso/entidade e vamos passar atributos para ele.
    {   
    const job = req.body;
    job.created_at: Date.now();
    }
*/

// Apontando para a função controladora save do JobController.

routes.post('/job', JobController.save);

// Apontando para a função controladora index do ProfileController que está na pasta controllers.

routes.get('/profile', ProfileController.index);

// Fará o update do profile.
// Essa função está no ProfileController que está na pasta controllers

routes.post('/profile', ProfileController.update);

// Vamos jogar a rota para fora usando a propríedade abaixo.

module.exports = routes;