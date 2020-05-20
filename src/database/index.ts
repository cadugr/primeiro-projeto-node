import { createConnection } from 'typeorm';

/**
 * Essa função vai procurar um arquivo na raiz do meu projeto chamado
 * ormconfig.json e lerá as configurações do mesmo
 * Os parâmetros do ormconfig.json podem ser passados diretamente dentro de um
 * objeto na função abaixo, e então não utilizamos esse arquivo.  No entanto, se
 * fizermos desta forma, não vai funcionar rodar alguns comandos importantes do
 * typeorm na linha de comando.
 * */

createConnection();
