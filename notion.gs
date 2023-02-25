function getNotionData(databaseId) {
  var options = {
    "method": "get",
    "headers": {
      "Authorization": "Bearer " + PropertiesService.getScriptProperties().getProperty('notionApiKey'),
      "Notion-Version": "2022-02-22"
    }
  };

  var response = UrlFetchApp.fetch("https://api.notion.com/v1/databases/" + databaseId, options);
  var notionData = JSON.parse(response.getContentText());
  return notionData;
}

function createNotionPageTask(taskName, taskTimestamp, taskId, taskTags) {
  var headers = {
    "Authorization": "Bearer " + PropertiesService.getScriptProperties().getProperty('notionApiKey'),
    "Notion-Version": "2022-02-22",
    "Content-Type": "application/json"
  };

  taskTags = taskTags || {
    "multi_select": [
      {
        "id": "97036d25-cc84-45a3-8e38-96127a792473",
        "name": "Saúde",
        "color": "green"
      }
    ]
  }

  var data = {
    "parent": {
      "database_id": PropertiesService.getScriptProperties().getProperty('notionTasksDatabaseId')
    },
    "icon": {
      "type": "emoji",
      "emoji": "🐰"
    },
    "properties": {
      "Name": {
        "title": [
          {
            "text": {
              "content": taskName
            }
          }
        ]
      },
      "Prazo": {
        "date": {
          "start": taskTimestamp,
          "end": null,
          "time_zone": null
        }
      },
      "Gravidade": {
        "select": {
          "id": "KO>u",
          "name": "1",
          "color": "purple"
        }
      },
      "Urgência": {
        "select": {
          "id": "k^{Z",
          "name": "1",
          "color": "red"
        }
      },
      "Tendência": {
        "select": {
          "id": "OgUG",
          "name": "1",
          "color": "brown"
        }
      },
      "Tags": taskTags,
      "Google Task Identifier": {
        "rich_text": [
          {
            "type": "text",
            "text": {
              "content": taskId || null,
              "link": null
            },
            "annotations": {
              "bold": false,
              "italic": false,
              "strikethrough": false,
              "underline": false,
              "code": false,
              "color": "default"
            }
          }
        ]
      }
    }
  };

  var options = {
    "method": "post",
    "headers": headers,
    "payload": JSON.stringify(data)
  };
  var response = UrlFetchApp.fetch("https://api.notion.com/v1/pages/", options);
  var pageId = JSON.parse(response.getContentText()).id;
  return pageId;
}

function updateNotionPageTask(pageId, propertiesParams) {
  var headers = {
    "Authorization": "Bearer " + PropertiesService.getScriptProperties().getProperty('notionApiKey'),
    "Notion-Version": "2022-02-22",
    "Content-Type": "application/json"
  };

  var data = {
    "properties": propertiesParams
  };

  var options = {
    "method": "patch",
    "headers": headers,
    "payload": JSON.stringify(data)
  };
  var response = UrlFetchApp.fetch("https://api.notion.com/v1/pages/" + pageId, options);

  return JSON.parse(response.getContentText());
}

function querieDatabaseNotion(filterParams, start_cursor) {
  var headers = {
    "Authorization": "Bearer " + PropertiesService.getScriptProperties().getProperty('notionApiKey'),
    "Notion-Version": "2022-02-22",
    "Content-Type": "application/json"
  };

  var data = {
    "filter": filterParams
  };

  if(start_cursor){
    data.start_cursor = start_cursor;
  }

  var options = {
    "method": "post",
    "headers": headers,
    "payload": JSON.stringify(data)
  };
  
  var response = UrlFetchApp.fetch("https://api.notion.com/v1/databases/" + PropertiesService.getScriptProperties().getProperty('notionTasksDatabaseId') + "/query", options);

  return JSON.parse(response.getContentText());
}