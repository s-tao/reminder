from flask import Flask, session, request, jsonify
from model import connect_to_db, db, User, Tasks
from model_helper import add_user


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

    return f'Welcome {first_name} {last_name}!'


@app.route('/login', methods=['POST'])
def login():
    """User login"""

    user_login = request.get_json()
    print(user_login)
    user = User.query.filter(User.email == user_login['email']).first()

    if not user or user.password != user_login['password']:
        return 
        
    session['user'] = user_login['email']

    return f'Hello {user.first_name} {user.last_name}!'


@app.route('/todo-list', methods=['GET'])
def todo():
    """Add tasks in todo list"""
    pass


if __name__ == '__main__':

    app.debug = True

    connect_to_db(app)

    app.run()