from flask import Flask, session, request, jsonify
from model import connect_to_db, db, User, Task
from model_helper import (add_user, 
                          add_task, 
                          get_user_tasks, 
                          remove_task_from_db,
                          update_completion, 
                          get_completed_tasks)
from json_helpers import convert_tasks_to_json
from send_sms import send_reminder
from datetime import datetime, timedelta


app = Flask(__name__)
app.secret_key = 'TEMP'


@app.route('/register', methods=['POST'])
def register_form():
    """User register form"""

    user_input = request.get_json()

    user = User.query.filter(User.email == user_input['email']).first()

    if user:
        return 

    add_user(user_input)

    session['user'] = user_input['email']
    first_name = user_input['firstName']
    last_name = user_input['lastName']

    return 'Success'


@app.route('/login', methods=['POST'])
def login():
    """User login"""

    user_login = request.get_json()
    print(user_login)
    user = User.query.filter(User.email == user_login['email']).first()

    if not user or user.password != user_login['password']:
        return 
        
    session['user'] = user_login['email']

    return 'Success'


@app.route('/todo-list', methods=['GET'])
def get_todo():
    """Get tasks from todo list database"""
    
    user_email = session.get('user')
    user_tasks = get_user_tasks(user_email)

    tasks = convert_tasks_to_json(user_tasks)


    return jsonify(tasks)


@app.route('/todo-list', methods=['POST'])
def send_todo():
    """Add tasks in todo list database"""
    
    task_info = request.get_json()
    user_email = session.get('user')
    # print(task_info)
    new_task = add_task(task_info, user_email)

    return jsonify({'taskId': new_task.task_id})


@app.route('/remove-task', methods=['POST'])
def remove_task():
    """Remove task from database"""

    task_id = request.get_json()
    remove_task_from_db(task_id)

    # need to confirm if remove_task_from_db successfully ran
    return 'Success'


@app.route('/completed-tasks', methods=['GET'])
def show_completed_tasks():

    user_email = session.get('user')
    user_completed_tasks = get_completed_tasks(user_email)

    json_completed_tasks = convert_tasks_to_json(user_completed_tasks)
    # print(json_completed_tasks, 'tasks \n\n')

    return jsonify(json_completed_tasks)


@app.route('/completed-task', methods=['POST'])
def update_completed_task():
    """Update task to be complete in database"""
    
    task_id = request.get_json()
    update_completion(task_id)

    return 'Success'





if __name__ == '__main__':

    app.debug = True

    connect_to_db(app)
    app.run()
    