from flask import Blueprint, render_template

taper = Blueprint('taper', __name__, template_folder='templates')

#@taper.route('/')
@taper.route('/non-linear/', methods = ['GET', 'POST'])
def non_linear():
    return render_template('taper.html')

@taper.route('/linear/', methods = ['GET', 'POST'])
def linear():
    return render_template('taper.html')