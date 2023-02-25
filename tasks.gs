/**
 * Lists the titles and IDs of tasksList.
 * @see https://developers.google.com/tasks/reference/rest/v1/tasklists/list
 */
function listTaskLists() {
  try {
    // Returns all the authenticated user's task lists.
    const taskLists = Tasks.Tasklists.list();
    // If taskLists are available then print all tasklists.
    if (!taskLists.items) {
      console.log('No task lists found.');
      return;
    }
    // Print the tasklist title and tasklist id.
    for (let i = 0; i < taskLists.items.length; i++) {
      const taskList = taskLists.items[i];
      console.log('Task list with title "%s" and ID "%s" was found.', taskList.title, taskList.id);
    }

    return taskLists;

  } catch (err) {
    console.log('Failed with an error %s ', err.message);
  }
}

/**
 * Lists task items for a provided tasklist ID.
 * @param  {string} taskListId The tasklist ID.
 * @see https://developers.google.com/tasks/reference/rest/v1/tasks/list
 */
function listTasks(taskListId, startDue, endDue) {
  try {
    // List the task items of specified tasklist using taskList id.
    const tasks = Tasks.Tasks.list(taskListId, { showHidden: true, dueMin: startDue || null, dueMax: endDue || null });
    // If tasks are available then print all task of given tasklists.
    if (!tasks.items) {
      console.log('No tasks found.');
      return;
    }
    // Print the task title and task id of specified tasklist.
    for (let i = 0; i < tasks.items.length; i++) {
      const task = tasks.items[i];

      console.log('Task with title "%s" and ID "%s" was found.\nTarefa Data: %s\n\nNotes: %s', task.title, task.id, task);
    }

    return tasks;

  } catch (err) {
    // TODO (developer) - Handle exception from Task API
    console.log('Failed with an error %s', err.message);
  }
}



