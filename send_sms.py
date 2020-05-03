"""Send twilio text as reminder to user"""
from model import User, Task
import os
from twilio.rest import Client
from model import connect_to_db, db, User, Task
from datetime import datetime, timedelta

account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
twilio_number = os.environ['TWILIO_NUMBER']

client = Client(account_sid, auth_token)

def scheduled_sms_reminder_check():        
    # users_opt_in_tasks = db.session.query(User).select_from(Task).\
    #                         join(Task.user_id).filter(User.phone != None, Task.completed == False)

    # query all users who input phone number to opt in for text reminders
    users_opt_in = User.query.filter(User.phone != None).all()
    today = datetime.today()

    for user in users_opt_in:
        # query all tasks from user where task is not completed
        user_tasks = Task.query.filter(Task.completed == False, 
                                       Task.user_id == user.user_id).all()

        tasks_due = []

        for task in user_tasks:
        
            time_diff = today + timedelta(hours=24)

            if time_diff >= task.due_date:
                tasks_due.append(task)
        # print('this executes')
        send_reminder(user, tasks_due)



            
def send_reminder(user, tasks_due):

    num_tasks = len(tasks_due)

    if num_tasks == 1:
        # text not wrapping at \ for some reason
        body = f"Hello {user.first_name.capitalize()}, your task: {tasks_due[0].task_desc} is due soon. Please check your list for more information."

    elif num_tasks > 1:
        body = f"Hello {user.first_name.capitalize()}, you have {num_tasks} tasks \
            that are due soon. Please check your list for more information."

    else:
        return

    to = user.phone,
    client.messages.create(
        to,
        from_=twilio_number,
        body=body)

if __name__ == '__main__':

    from flask import Flask, session, request, jsonify

    app = Flask(__name__)
    connect_to_db(app)
    scheduled_sms_reminder_check()
    print('Reminders Sent')