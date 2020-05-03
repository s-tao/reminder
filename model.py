from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class User(db.Model):
    """User information"""

    __tablename__ = 'users'

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)   
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(15), nullable=True)


    def __repr__(self):

        return f'<User user_id={self.user_id} email={self.email}>'
                   

class Task(db.Model):
    """Task information"""

    __tablename__ = 'tasks'

    task_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    task_desc = db.Column(db.Text, nullable=False)
    add_notes = db.Column(db.Text, nullable=True)
    # priority = db.Column(db.String(5), nullable=False)
    created_date = db.Column(db.DateTime, nullable=False)
    due_date = db.Column(db.DateTime, nullable=True)
    completed = db.Column(db.Boolean, nullable=False)
    user_id = db.Column(db.Integer, 
                        db.ForeignKey('users.user_id'), index=True)


    # Define relationship to user
    user = db.relationship('User', backref=db.backref('tasks', order_by=task_id))


    def __repr__(self):

        return f'<Task task_id={self.task_id} completed={self.completed}'



def connect_to_db(app, db_uri='postgresql:///todo-list'):

    app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_ECHO'] = False
    db.app = app
    db.init_app(app)


if __name__ == '__main__':

    from server import app
    connect_to_db(app)
    db.create_all()
    print('Connected to DB.')