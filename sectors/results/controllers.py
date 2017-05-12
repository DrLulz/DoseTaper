from flask import Blueprint, render_template

results = Blueprint('results', __name__, template_folder='templates')

@results.route('/')
def index():
    return render_template('results.html')