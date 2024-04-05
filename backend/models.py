from config import db, login_manager
from datetime import datetime
from flask_login import UserMixin


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(20), nullable=False,
                           default='default.jpg')
    user_type = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(60), nullable=False)
    posts = db.relationship('Post', backref='creator', lazy=True)
    region = db.relationship('Region', backref='creator', lazy=True)
    farm = db.relationship('Farm', backref='creator', lazy=True)

    def to_json(self):
        data = {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "userType": self.user_type,
            "imageFile": self.image_file,
        }

        return data


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30), nullable=False, default='Post')
    date_created = db.Column(
        db.DateTime, nullable=False, default=datetime.today)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def to_json(self):
        data = {
            "id": self.id,
            "title": self.title,
            "dateCreated": self.date_created.strftime('%Y-%m-%d %H:%M:%S'),
            "content": self.content,
            "userId": self.user_id
        }

        return data


class Region(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    country = db.Column(db.String(30), nullable=False)
    state = db.Column(db.String(30), nullable=False)
    city = db.Column(db.String(30), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def to_json(self):
        data = {
            "id": self.id,
            "country": self.country,
            "state": self.state,
            "city": self.city,
        }

        return data


class Farm(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(30), nullable=False)
    farm_name = db.Column(db.String(30), nullable=False)
    no_of_system = db.Column(db.Integer, nullable=False, default=0)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def to_json(self):
        data = {
            "id": self.id,
            "location": self.location,
            "farmName": self.farm_name,
            "noOfSystem": self.no_of_system,
        }

        return data
