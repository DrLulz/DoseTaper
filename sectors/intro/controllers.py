from flask import Blueprint, render_template

intro = Blueprint('intro', __name__, template_folder='templates')

@intro.route('/')
def index():
    return render_template('intro.html')