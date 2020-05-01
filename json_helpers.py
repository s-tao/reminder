def convert_tasks_to_json(user_tasks):
    tasks = []

    for task in user_tasks:
        # match json format in react
        task_dict = {}
        task_dict['taskForm'] = {}

        task_dict['taskForm']['task'] = task.task_desc
        task_dict['taskForm']['addNote'] = task.add_notes
        task_dict['taskForm']['isComplete'] = task.completed

        task_dict['deadline'] = task.due_date
        task_dict['taskId'] = task.task_id

        tasks.append(task_dict)


    return tasks