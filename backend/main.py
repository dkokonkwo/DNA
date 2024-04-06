from flask import redirect, url_for, render_template, flash, request, abort, jsonify, session
from config import app, db, bcrypt
from models import User, Post, Region, Farm
from flask_session import Session
from PIL import Image
import secrets
import os
from datetime import datetime
from weather import get_weather


# ROUTES:
# dashboard
# farm
# posts (update, delete, create)
# profile
# login
# sign up

# Endpoint to check if user is logged in

@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unathorized"}), 401

    user = User.query.get(user_id)

    if user is None:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "email": user.email,
        "username": user.username,
        "userType": user.user_type,
    }), 200


@app.route("/", methods=["GET"])
@app.route("/dashboard", methods=["GET"])
def dashboard():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "User not authenticated"}), 401

    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    farms = Farm.query.filter_by(user_id=user.id).all()
    json_farms = [farm.to_json() for farm in farms]

    last_post = Post.query.filter_by(user_id=user.id).order_by(
        Post.date_created.desc()).first()
    json_last_post = last_post.to_json() if last_post else None

    weather = None
    if user.region:
        region_one = Region.query.filter_by(user_id=user_id).first()
        if region_one:
            city = region_one.city
            weather = get_weather(city)
            weather['city'] = city

    data = {
        "farms": json_farms,
        "user": user.to_json(),
    }
    if json_last_post:
        data["lastPost"] = json_last_post
    if weather:
        data["weather"] = weather

    return jsonify(data), 200


@app.route("/farm", methods=['GET', 'POST'])
def farm():
    user_id = session.get("user_id")
    user = User.query.filter_by(id=user_id).first()

    farm = Farm.query.filter_by(user_id=user.id).first()
    if not farm:
        return jsonify({"message": "add new farm"}), 400


@app.route("/signup", methods=['GET', 'POST'])
def signup():
    username = request.json.get("username")
    email = request.json.get("email")
    password = request.json.get("password")
    confirm_password = request.json.get("confirmPassword")
    user_type = request.json.get("userType")
    # country = request.get("country")
    # state = request.get("state")
    # city = request.get("city")
    if password != confirm_password:
        return jsonify({"message": "passwords do not match"}), 400
    if not username or not email or not password:
        return jsonify({"message": "you must fill all fields"}), 400

    hashed_password = bcrypt.generate_password_hash(
        password).decode('utf-8')
    user = User(username=username,
                email=email, password=hashed_password, user_type=user_type)
    try:
        db.session.add(user)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    return jsonify({"message": "Your account has now been created! You can now log in"}), 201


@app.route("/login", methods=['POST'])
def login():
    email = request.json.get("email")
    password = request.json.get("password")
    if not email or not password:
        return jsonify({"message": "please input your details"}), 400

    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        session["user_id"] = user.id
        # login_user(user)
        # next_page = request.args.get('next')
        return jsonify({
            "message": "login sucessful",
        }), 200
    else:
        return jsonify({"message": 'Login unsucessful. Please check email and password'}), 400


def save_picture(form_picture):
    random_hex = secrets.token_hex(8)
    _, f_ext = os.path.splitext(form_picture.filename)
    picture_fn = random_hex + f_ext
    picture_path = os.path.join(app.root_path, 'static/images', picture_fn)

    output_size = (300, 300)
    i = Image.open(form_picture)
    i.thumbnail(output_size)

    i.save(picture_path)

    return picture_fn


@app.route("/update_profile", methods=['GET', 'POST'])
def update_profile():
    user_id = session.get("user_id")
    user = User.query.filter_by(id=user_id).first()

    password = request.json.get("password")
    if password:
        hashed_password = bcrypt.generate_password_hash(
            password).decode('utf-8')
    else:
        hashed_password = user.password

    data = request.json
    user.username = data.get("username", user.username)
    user.email = data.get("email", user.email)
    user.image_file = data.get("imageFile", user.image_file)
    user.password = request.json.get(hashed_password, user.password)

    db.session.commit()
    return jsonify({"message": "Profile updated"}), 200


@app.route("/logout")
def logout():
    session.pop('user_id', None)
    return jsonify({"message": "logout successful"}), 200


@app.route("/posts", methods=["GET"])
def posts():
    posts = Post.query.all()
    if len(posts) < 1:
        return jsonify({"message": "no posts"}), 400

    usernames = [post.creator.username for post in posts]
    json_posts = [post.to_json() for post in posts]
    return jsonify({
        "posts": json_posts,
        "usernames": usernames,
    }), 200


@app.route("/create_post", methods=["POST"])
def create_post():
    title = request.json.get("title")
    content = request.json.get("content")

    user_id = session.get("user_id")
    user = User.query.filter_by(id=user_id).first()

    if not content:
        return jsonify({"message": session['email']}), 400

    new_post = Post(content=content, creator=user)
    new_post.title = title if title else f"{session['email']} Post"
    try:
        db.session.add(new_post)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "post created"}), 201


@app.route("/update_post/<int:post_id>", methods=["PATCH"])
def update_post(post_id):
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"message": "User not authenticated"}), 401

    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({"message": "User not found"}), 404

    post = Post.query.filter_by(id=post_id, user_id=user.id).first()
    if not post:
        return jsonify({"message": "Post not found"}), 404

    data = request.json
    post.title = data.get("title", post.title)
    post.content = data.get("content", post.content)
    post.date_created = datetime.today()

    db.session.commit()

    return jsonify({"message": "Post updated"}), 200


@app.route("/delete_post/<int:post_id>", methods=["DELETE"])
def delete_post(post_id):
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"message": "User not authenticated"}), 401

    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({"message": "User not found"}), 404

    post = Post.query.filter_by(id=post_id, user_id=user.id).first()
    if not post:
        return jsonify({"message": "Post not found"}), 404

    db.session.delete(post)
    db.session.commit()

    return jsonify({"message": "Post deleted!"}), 200


@app.route("/region", methods=["POST"])
def update_region():
    country = request.json.get("country")
    state = request.json.get("state")
    city = request.json.get("city")

    user_id = session.get("user_id")
    user = User.query.filter_by(id=user_id).first()

    if not country or not city or not state:
        return jsonify({"message": "Fill in every detail"}), 400

    region = Region(country=country, state=state, city=city, creator=user)
    try:
        db.session.add(region)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Region updated"}), 201


@app.route("/get_region", methods=['GET'])
def get_region():
    user_id = session.get("user_id")
    user = User.query.filter_by(id=user_id).first()

    if user is None:
        return jsonify({"message": "user not found"}), 404

    # Check if there are regions associated with the user
    if not user.region:
        return jsonify({"message": "no region set"}), 400

    region_one = Region.query.filter_by(user_id=user_id).first()

    if not region_one.country or not region_one.state:
        return jsonify({"message": "no region set"}), 400

    return jsonify({
        'country': region_one.country,
        'state': region_one.state,
        'city': region_one.city
    }), 200


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run()
