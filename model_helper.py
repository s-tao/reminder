from sqlalchemy import func
from model import connect_to_db, db, User, Tasks

def add_user(user_input):
    """Save user information into database"""

    new_user = User(first_name=user_input['firstName'],
                    last_name=user_input['lastName'],
                    password=user_input['password'],
                    email=user_input['email'],
                    phone=user_input['phone']
                )

    db.session.add(new_user)
    db.session.commit()

