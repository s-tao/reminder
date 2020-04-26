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
        return 'User already exist, please login'

    add_user(user_input)

    session['user'] = user_input['email']

    return 'Account successfully created!'


@app.route('/login', methods=['POST'])
def login():
    """User login"""

    user_login = request.get_json()
    print(user_login)
    user = User.query.filter(User.email == user_login['email']).first()

    if not user:
        print('user doesn\'t exist')

        return 'User does not exist'
    
    if user.password != user_login['password']:
        return 'Password incorrect'
    
    session['user'] = user_login['email']
    print('success')
    return f'Welcome {user.first_name} {user.last_name}!'




if __name__ == '__main__':

    app.debug = True

    connect_to_db(app)

    app.run()