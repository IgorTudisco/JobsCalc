// Esse aquivo será responsável por gerenciar a transferencia de dados entre o programa e o DB.

// Impontando o sqlite3 e o sqlite.

const sqlite3 = require('sqlite3');

/*

    No caso do sqlite, vamos precisar apenas de uma função.

    Assim podemos usar as chaves dentro da declaração da constante.

    Desse modo vamos dizer ao programa que é para ele ir lá no
    sqlite e pegar/trazer apenas a função open.

*/

const { open } = require('sqlite');

// Construindo a conexão com o banco.

/*

    O open para funcionar precisa estar dentro de uma estrutura especifica.
    Ele exige estar dentro de chaves. Exemplo: {open({...})}.

    Porém precisamos exporta o mesmo para outros arquivos como feito
    anteriormente usando o module.exports. Alé,disso a estrutura de {...}
    não funciona por si próprio.

    Ao usarmos essa função, o open entende subjetivamente que ele
    está dentro de um objeto e não funciona como deveria funcionar.

    Para resolver esse problema usamos arrow function.
    Assim falamos para o open que ele é uma função.

*/

module.exports = () => {

    open({

        /*/database.sqlite

            './database.sqlite é o nome do arquivo onde os meus dados estarão salvos,
            essa caminha é passado para o meu filename para que o mesmo seja encontrado.

        */

        filename: "./database.sqlite",
    
        /*

            O driver é o meu gerenciado do meu software de dados,
            responsável por quarda os dados no meu aquivo.
            
        */

        driver: sqlite3.Database,
    });

};