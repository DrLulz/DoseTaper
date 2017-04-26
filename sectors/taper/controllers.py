from flask import Blueprint, render_template

taper = Blueprint('taper', __name__, template_folder='templates')

@taper.route('/')
def index():
    return render_template('taper.html')