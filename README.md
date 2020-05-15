# Reminder

Reminder is a full-stack to-do list web application. Users can set a deadline 
for each task and opt to receive a daily text reminder through Twilio's API by 
inputting their phone number when they register. Users will only be reminded for 
the task(s) that are due in 24 hours.

This project was created to learn the fundamentals of React.js. 

<img src="/README_gif/homepage.png" alt="Reminder homepage" />

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Contents

* [Tech Stack](#techstack)
* [Installation](#install)
* [To-do List Features](#features)

## <a name=techstack></a>Tech Stack

**Backend |** Python, Flask, SQLAlchemy, PostgreSQL, cron<br>
**Frontend |** React.js, Material-UI<br>
**APIs |** Twilio

## <a name=install></a>Installation

Create a React App 
```
$ npx create-react-app flask-react-app
$ cd flask-react-app
```

Create a file `secrets.sh` to store [Twilio](https://www.twilio.com/docs) API 
key
```
export TWILIO_ACCOUNT_SID='YOUR_KEY'
export TWILIO_AUTH_TOKEN='YOUR_KEY'
export TWILIO_NUMBER='YOUR_NUMBER'
```
Clone Reminder repository
```
$ git clone https://github.com/s-tao/reminder.git
```
Create a virtual environment in the directory and activate environment and 
secrets
```
$ virtualenv env
$ source env/bin/activate
$ source secrets.sh
```
Install dependencies
```
$ pip3 install -r requirements.txt
```
Create database
```
$ createdb todo-list
$ python3 model.py
``` 
Run the app
```
$ python3 server.py
$ npm start
```
View to-do list on localhost:3000 on your browser

## <a name=features></a> To-do List Features
**Login/Register** <br>
User can login to view their existing tasks or register if they don't have an 
account to start adding tasks.

Once user logins/registers, they're directed to their to-do list where they can 
begin adding tasks.

![](/README_gif/login.gif)

**Add Tasks** <br>
User can input task, description, and deadline.

![](/README_gif/add-task.gif)

**Remove / Complete Tasks**
User can remove and mark tasks as completed. Completed tasks will be logged 
into a separate page.

![](/README_gif/complete-remove-task.gif)

**Receive Text Reminder**
<img src="/README_gif/twilio-sms-reminder.png" alt="Twilio SMS Reminder"/>
