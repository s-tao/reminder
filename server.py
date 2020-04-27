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

@app.route('/todo-list', methods=['POST'])
def todo():
    """Add tasks in todo list"""
    
    task_info = request.get_json()
    user_email = session.get('user')

    add_task(task_info, user_email)



    return 'pass'


if __name__ == '__main__':

    app.debug = True

    connect_to_db(app)

    app.run()