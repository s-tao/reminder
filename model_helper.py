from sqlalchemy import func
from model import connect_to_db, db, User, Task
from datetime import date

def add_user(user_input):
    """Save user information into database"""

    new_user = User(
                first_name=user_input['firstName'],
                last_name=user_input['lastName'],
                password=user_input['password'],
                email=user_input['email'],
                phone=user_input['phone']
                )

    db.session.add(new_user)
    db.session.commit()

def add_task(task_info, user_email):
    """Save task information into database"""

    user = User.query.filter(User.email == user_email).first()
    today = date.today()

    new_task = Task(
                task_desc=task_info['taskForm']['task'],
                add_notes=task_info['taskForm']['addNote'],
                created_date=today,
                due_date=task_info['deadline'],
                completed=task_info['taskForm']['completed'],
                user_id=user.user_id
                )
    
    db.session.add(new_task)
    db.session.commit()
    