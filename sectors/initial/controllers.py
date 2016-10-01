from flask import Blueprint, render_template

initial = Blueprint('initial', __name__, template_folder='templates')

@initial.route('/')
def index():
    return render_template('index.html')