# notion-google-task-synchronizer

# Descrição do projeto

Este repositório no Github contém um conjunto de arquivos de código que implementam funções para o Google Apps Script, permitindo a sincronização de tarefas do Google Tasks com um banco de dados do Notion. O objetivo é fornecer uma maneira fácil de integrar as funcionalidades do Google Tasks com o Notion, para gerenciar tarefas de forma mais eficiente e colaborativa.

O conjunto de arquivos de código foi projetado para ser fácil de usar e configurar, mesmo para usuários com pouca ou nenhuma experiência em programação. As funções implementadas no código são bem documentadas e estruturadas, permitindo que os usuários possam entender facilmente o que cada parte do código faz e como ele pode ser modificado para atender às suas necessidades.

O repositório também inclui um guia passo a passo para ajudar os usuários a configurar a integração entre o Google Tasks e o Notion, bem como exemplos de uso da funcionalidade implementada. Além disso, o repositório está aberto a contribuições da comunidade, permitindo que outros usuários possam adicionar novas funcionalidades e melhorias ao código existente.

# Requisitos

- Projeto no Google Apps Script
- Conta no Notion
- Template da tabela de tarefas obtido através do autor
- Chave de API do Notion (https://developers.notion.com/docs/getting-started)

# Instalação

## Criação da conta no Notion e solicitação do template

1. Após a criação da conta no Notion, copi e cole a url (https://whimsical-emoji-d72.notion.site/3f3012f332a7484f80d9dada668e1fc5?v=b89a15f9ff764d9cad6204bce80f091e) no seu navegador para você duplicar o temlate no seu workspace;
2. Duplique-o para o seu workspace
3. Após a duplicação obtenha o ID do database duplicado como mostras as instruções no link (https://developers.notion.com/docs/working-with-databases)
4. Siga as intruções dessa documentação para criar sua integração e obter sua chave da api

## Preparar o projeto do Apps Script

1. Crie as seguintes variáveis de script dentro do seu projeto em: Configurações do projeto > Propriedades do Script
  - notionApiKey - O valor dessa propriedade será o valor da sua chave
  - notionTaskDatabaseId - O valor dessa propriedade será o valor do ID do database obtido anteriormente
  - urlExtractionSheets - Caso queira realizar extração do seu database em algum Sheets crie essa propriedade e cole aqui a url da planilha para extração
  
2. Adicione o serviço do Google Tasks no seu projeto, e caso queira realizar a extração, adicione também o Sheets.

3. Copie e cole os arquivos desse projeto para o seu projeto no GoogleAppsScript:
  - tasks.gs
  - notion.gs
  - manager.gs


# Como usar

Após a conclusão das etapas anteriores, nesse momento já será possível testar algumas funções. Se ler o código perceberá que para contornar a limitação do Google Tasks em adicionar variáveis customizáveis usamos uma estrtura de JSON no local das "Notas" em cada tarefa cadastrada. Um exemplo do objeto padrão usado é:

```
{
  "notes": "-",
  "expected_execution_time": "15:00:00",
  "Tags": {
    "multi_select": [
      {
        "name": "Saúde"
      }
    ]
  }
}

```

* notes (STRING): nessa chave definos valores de notas de fato sobre a tarefa;
* expected_execution_time (STRING): nessa chave definos o horário para execução da tarefa no padrão HH24:MI:SS. Obrigatório, caso não se aplique, deixe "00:00:00"
* Tags: nessa chave contituímos o objeto que será usado para tagear a tarefa no notion. Lembre-se de usar exatamente o mesmo nome descrito em cada tag usada para manter os mesmos padrões e os filtros funcionarem bem.

## Acionadores automáticos
Por fim basta adiconar os acionadores no seu projeto para que a sincronização inicie. 
1. Vá em Acionadores > Adicionar acionador
2. Crie um acionador para cada função abaixo
* createTasksOnNotion: Sugestão, use o acionador por tempo e selecione um horário após a meia noite para que a função cadastre no notion diariamente as tarefas cadastradas, principalmente as recorrentes.
* updateCompletedTasksOnNotion: Sugestão, use o acionador por tempo e selecione uma frequência mais alta, de acordo com a sua necessidade, por exemplo, a cada hora, ou a cada duas ou três horas.
* extractNotionTasksOnSpreadsheet: Sugestão, use também o acionador por tempo e crie apenas queira realizar extrações recorrentes para análises frequentes em alguma ferramenta gráfica para acompanhar o andamento das resoluções das tarefas. Essa função é opcional, mas recomendo inclusive usar a planilha como fonte de dados em um dashboard no Looker Studio e embedar o dash no seu Notion passoal para acompanhar.

# Contribuição
Se você deseja contribuir para este projeto, siga os seguintes passos:

- Crie um fork deste repositório.
- Clone o fork em sua máquina local.
- Faça as alterações necessárias.
- Envie um pull request.

# Autor
Esse arquivo foi redigido por Marcelo Masson (marceloteixeiram@hotmail.com), assim como o projeto em questão. 
