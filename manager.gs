function createTasksOnNotion() {
  var taskLists = listTaskLists();

  var today = new Date();
  var startOftoday = Utilities.formatDate(today, "GMT-3", "yyyy-MM-dd'T'00:00:00'Z'");
  var endOfToday = Utilities.formatDate(new Date(today.getTime() + (1000 * 60 * 60 * 24)), "GMT-3", "yyyy-MM-dd'T'00:00:00'Z'");

  for (let i = 0; i < taskLists.items.length; i++) {
    const taskList = taskLists.items[i];

    var tasks = listTasks(taskList.id, startOftoday, endOfToday);

    for (let j = 0; j < tasks.items.length; j++) {
      const task = tasks.items[j];

      var notesJSON = JSON.parse(task.notes);
      var taskTimestamp = task.due.substring(0, 10) + 'T' + (notesJSON.expected_execution_time || '00:00:00') + '-03:00';
      var taskTags = notesJSON.Tags

      var pageId = createNotionPageTask(task.title, taskTimestamp, task.selfLink, taskTags);

      console.log('Task created on Notion with page id: ' + pageId);
    }
  }
}

function updateCompletedTasksOnNotion() {
  
  var now = new Date();
  var endOfLastHour = now;
  var startOfLastHour = new Date(now.getTime() - (1000 * 60 * 60 * 1));
  var startOftoday = Utilities.formatDate(now, "GMT-3", "yyyy-MM-dd'T'00:00:00'Z'");
  var endOfToday = Utilities.formatDate(new Date(now.getTime() + (1000 * 60 * 60 * 24)), "GMT-3", "yyyy-MM-dd'T'00:00:00'Z'");

  console.log('Tasks completed between %s - %s will be updated', startOfLastHour, endOfLastHour);

  const propertiesParams = {
    "Status": {
      "status": {
        "name": "Feito"
      }
    }
  }

  var taskLists = listTaskLists()

  for (let i = 0; i < taskLists.items.length; i++) {
    const taskList = taskLists.items[i];

    var tasks = listTasks(taskList.id, startOftoday, endOfToday);
    console.log("Length of task List: " + tasks.items.length);

    for (let j = 0; j < tasks.items.length; j++) {
      var task = tasks.items[j];

      console.log("Task id: " + task.id + "\nCompleted at: " + new Date(task.completed));

      if (task.status === 'completed' && new Date(task.completed) >= startOfLastHour && new Date(task.completed) < endOfLastHour) {
        console.log("This task will be updated. Task id: " + task.id);

        const filterParams = {
          "and": [
            {
              "property": "Criado por",
              "created_by": {
                "contains": "5e834eab-1e92-4f92-8430-a2b742b0e142"
              }
            },
            {
              "property": "Google Task Identifier",
              "rich_text": {
                "contains": "lists/" + taskList.id + "/tasks/" + task.id
              }
            }
          ]
        }

        var responseQuerie = querieDatabaseNotion(filterParams);

        for (let k = 0; k < responseQuerie.results.length; k++) {
          const page = responseQuerie.results[k];

          var responseUpdate = updateNotionPageTask(page.id, propertiesParams);

          console.log("Update return: " + JSON.stringify(responseUpdate));

        }
      }
    }
  }
}

function extractNotionTasksOnSpreadsheet() {

  var today = new Date();
  var endOfLast30days = Utilities.formatDate(new Date(today.getTime() + (1000 * 60 * 60 * 24 * 1)), "GMT-3", "yyyy-MM-dd");
  var startOfLast30days = Utilities.formatDate(new Date(today.getTime() - (1000 * 60 * 60 * 24 * 30)), "GMT-3", "yyyy-MM-dd");

  var filterParams = {
    "and": [
      {
        "property": "Prazo",
        "date": {
          "on_or_after": startOfLast30days
        }
      },
      {
        "property": "Prazo",
        "date": {
          "on_or_before": endOfLast30days
        }
      }
    ]
  }

  var responseQuerie = {};

  var resultItems = [];

  var has_more = true;
  var next_cursor = null;

  console.log('Starting the extraction, if the result contains more than 100 pages we need to call more times the Notion API.');

  do {

    responseQuerie = querieDatabaseNotion(filterParams, next_cursor);
    resultItems = resultItems.concat(responseQuerie.results);

    has_more = responseQuerie.has_more;
    next_cursor = responseQuerie.next_cursor;

  } while (has_more);

  var arrayOfObjects = [];

  console.log('We get %s tasks on Notion. All will writed on Sheets: %s', resultItems.length, PropertiesService.getScriptProperties().getProperty('urlExtractionSheets'));

  for (let a = 0; a < resultItems.length; a++) {

    const resultItem = resultItems[a];

    //console.log(JSON.stringify(resultItem));

    const googleTaskId = (resultItem.properties["Google Task Identifier"].rich_text[0] && resultItem.properties["Google Task Identifier"].rich_text[0].text.content) || null;

    var object = {
      "id": resultItem.id,
      "created_time": resultItem.created_time,
      "last_edited_time": resultItem.last_edited_time,
      "Criado em": resultItem.properties["Criado em"].created_time,
      "Google Task Identifier": googleTaskId,
      "Status": resultItem.properties["Status"].status.name,
      "Prazo Formatado": resultItem.properties["Prazo Formatado"].formula.string,
      "Tags": resultItem.properties["Tags"].multi_select[0].name,
      "Name": resultItem.properties["Name"].title[0].text.content,
      "Prazo": resultItem.properties["Prazo"].date.start
    }

    arrayOfObjects.push(object)

  }

  console.log('Starting the process of writing.');

  var spreadsheet = SpreadsheetApp.openByUrl(PropertiesService.getScriptProperties().getProperty('urlExtractionSheets'));
  var sheet = spreadsheet.getSheetByName('Data');
  if (sheet == null) {
    sheet = spreadsheet.insertSheet('Data');
  }
  sheet.clearContents();
  console.log('Page cleaned.');

  // Get the keys from the first object in the array
  var keys = Object.keys(arrayOfObjects[0]);

  // Write the keys to the first row of the sheet
  sheet.getRange(1, 1, 1, keys.length).setValues([keys]);

  // Write the rest of the data to the sheet
  var data = [];
  for (var i = 0; i < arrayOfObjects.length; i++) {
    var row = [];
    for (var j = 0; j < keys.length; j++) {
      row.push(arrayOfObjects[i][keys[j]]);
    }
    data.push(row);
  }
  sheet.getRange(2, 1, data.length, keys.length).setValues(data);
  console.log('All data writed.');
}