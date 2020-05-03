from sqlalchemy import func
from model import connect_to_db, db, User, Task
from datetime import date

def add_user(user_input):
    """Save user information into database"""

    if user_input['phone']:
        phone = "".join(num for num in user_input['phone'] if num.isdigit())
        phone_format = '+' + phone

    else:
        phone_format = user_input['phone']
        
    new_user = User(
                first_name=user_input['firstName'],
                last_name=user_input['lastName'],
                password=user_input['password'],
                email=user_input['email'],
                phone=phone_format
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
                completed=task_info['taskForm']['isComplete'],
                user_id=user.user_id
                )
    
    db.session.add(new_task)
    db.session.commit()
    
    # print(new_task, 'new_task \n\n')

    return new_task


def get_user_tasks(user_email):
    """Query all of user's tasks"""
    user = User.query.filter(User.email == user_email).first()
    user_tasks = Task.query.filter(Task.user_id == user.user_id,
                                        Task.completed == False).all()
    return user_tasks

def get_completed_tasks(user_email):
    """Query all of user's completed tasks"""

    user = User.query.filter(User.email == user_email).first()
    completed_tasks = Task.query.filter(Task.user_id == user.user_id,
                                        Task.completed == True).all()

    return completed_tasks


def remove_task_from_db(task_id):
    """Remove task from database"""

    Task.query.filter(Task.task_id == task_id).delete()

    db.session.commit()


def update_completion(task_id):
    """Update to show task is completed in database"""

    task = Task.query.filter(Task.task_id == task_id).first()
    task.completed = True

    db.session.commit()

