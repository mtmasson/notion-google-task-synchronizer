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
  a. notionApiKey - O valor dessa propriedade será o valor da sua chave
  b. notionTaskDatabaseId - O valor dessa propriedade será o valor do ID do database obtido anteriormente
2. Adicione o serviço do Google Tasks no seu projeto
3. Copie e cole os arquivos desse projeto para o seu projeto no GoogleAppsScript:
  a. tasks.gs
  b. notion.gs
  c. manager.gs


# Como usar


# Contribuição
