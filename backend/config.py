from flask import Flask, session
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_cors import CORS
from flask_session import Session
import redis
from dotenv import load_dotenv
import os


load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)
CORS(app, resources={r"/get_region": {"origins": "http://localhost:5173/profile"}})


app.config['SECRET_KEY'] = '69fabc551f04c6536181afc7ebe0cd18'
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URL")
# postgresql://dnadatabase_user:0iTgP2OXezlf1LPs3BI08bMUnIgiiBk5@dpg-co892ra0si5c73c6v72g-a.oregon-postgres.render.com/dnadatabase
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_REDIS'] = redis.from_url("redis://red-co8ap5v109ks73ebobgg:6379")
app.config['SESSION_COOKIE_SAMESITE'] = 'None'
app.config['SESSION_COOKIE_SECURE'] = True
app.config.from_object(__name__)

server_session = Session(app)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message_category = 'info'
