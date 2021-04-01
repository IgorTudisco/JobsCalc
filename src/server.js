/*
    require é um função que está sendo executada
    No caso vamos usar o riquire para chamar o modulo express,
    para isso precisamos colocá la em uma variável.
    Depois temos que rodar/executar a função.
*/

const express = require("express");

/*
    O express traz várias funcionalidades com ele,
    essas funcionalidades estão sendo herdada pelo serve com os comandos acima.

*/

const server = express();

/*
    Fazendo a comunicação com o arquivo routes.js para trazer as minhas rotas.
    Nesse caso vamos usar o caminho relativo.
*/

const routes = require("./routes");

/*
    ejs (Embedded JavaScript templating).
    Para instalar esse templating, vamos usar o comando npm i ejs.
    Para fazer as configurações do template no express vamos usar o comando
    set, que vai funcionar de forma semelhante ao send.
    Ele irá adicionar um motor ao meu servidor e irá refazer o meu html,
    me entegando um html puro.
*/

server.set('view engine', 'ejs');
    
/*
    Usamos o Midwhere para acessar as pastas públicas.
    Para isso vamos usar a função do express pelo server
    e usamos a propriedade static, passando a nossa pasta como argumento.
*/

server.use(express.static("public"));

// O request e o response estão no routes.
// Estamos fazendo o 'link' atraves do require.
// A função abaixo diz ao serve que devemos usar essas rotas.

server.use(express.urlencoded({ express: true }));

// Usando o req.body do routes
// Para isso vamos abilitar a função que irá receber os dados do método POST.
// Vamos usar as propriedades urlencoded que é do express.
// Os dados do post vem codificados, por isso vamos usar a função do extended.
// Assim podemos ler os dados sem probemas.

server.use(routes);

/*
    Agora no express vamos usar a propriedade listen para passar a porta que o nosso
    server irá abrir.

    O primeiro argumeto do listen será o número da porta que estará aberta,
    o segundo é o que será executado.

    Assim o servidor está rodando.

*/

server.listen(3000, () => console.log('rodando'));

/*
    [Para facilitar um pouco mais o desenvolvimento do servidor,
    vamos usar o nodemon para não ter que ficar ligando e desligando
    o nosso servidor toda hora, ele irá fazer isso toda vez que o servidor
    for modificado.
    Vamos fazer isso usando o comando (npm i nodemon -D), para que o mesmo
    só rode no ambiente de desenvolvimento.]
*/
