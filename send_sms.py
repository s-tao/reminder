"""Send twilio text as reminder to user"""
from model import User, Task
import os
from twilio.rest import Client

account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
twilio_number = os.environ['TWILIO_NUMBER']

client = Client(account_sid, auth_token)


def send_reminder(user, tasks_due):

    num_tasks = len(tasks_due)

    if num_tasks == 1:
        body = f"Hello {user.first_name.capitalize()}, your task: \
            {tasks_due[0]['taskForm']['task']} is due soon. Please check your \
            list for more information."

    elif num_tasks > 1:
        body = f"Hello {user.first_name.capitalize()}, you have {num_tasks} tasks \
            that are due soon. Please check your list for more information."

    else:
        return

    to = user['phone'],
    client.messages.create(
        to,
        from_=twilio_number,
        body=body)