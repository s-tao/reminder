from flask import Flask, session, request, jsonify
from model import connect_to_db, db, User, Task
from model_helper import add_user, add_task


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
    user = User.query.filter(User.email == user_email).first()
    user_tasks = Task.query.filter(Task.user_id == user.user_id).all()
    # print(user_tasks, "user_tasks \n\n\n")

    tasks = []

    for task in user_tasks:
        # match json format in react
        task_dict = {}
        task_dict['taskForm'] = {}

        task_dict['taskForm']['task'] = task.task_desc
        task_dict['taskForm']['addNote'] = task.add_notes
        task_dict['taskForm']['completed'] = task.completed
        task_dict['deadline'] = task.due_date
        task_dict['taskId'] = task.task_id

        tasks.append(task_dict)
    # print(tasks, 'tasks \n\n\n')

    return jsonify(tasks)


@app.route('/todo-list', methods=['POST'])
def send_todo():
    """Add tasks in todo list database"""
    
    task_info = request.get_json()
    user_email = session.get('user')
    # print(task_info)
    new_task = add_task(task_info, user_email)

    return jsonify({'taskId': new_task.task_id})


if __name__ == '__main__':

    app.debug = True

    connect_to_db(app)

    app.run()