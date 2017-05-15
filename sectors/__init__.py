from flask import Flask, render_template
from utils import get_instance_folder_path
#from flask_security import current_user, user_registered, SQLAlchemyUserDatastore
#from cache import cache
#from mail import mail
#from session import sess
#from csrf import csrf
#from config import configure_app, make_celery
#from data.models import db, User, Role
#import errors

from sectors.intro.controllers import intro
from sectors.taper.controllers import taper
from sectors.results.controllers import results
from sectors.user.controllers import user
#from project.admin.controllers import admin
#from project.user.controllers import user
#from project.results.controllers import results
#from project.calendar.controllers import calendar
#from project.tutorials.controllers import tutorials
#from project.disclaimer.controllers import disclaimer


app = Flask(__name__,
				instance_path=get_instance_folder_path(),
				instance_relative_config=True,
				template_folder='templates')

app.register_blueprint(intro, url_prefix='/')
app.register_blueprint(taper, url_prefix='/method')
app.register_blueprint(results, url_prefix='/results')
app.register_blueprint(user, url_prefix='/user')

'''
configure_app(app)
cache.init_app(app)
sess.init_app(app)
db.init_app(app)
mail.init_app(app)
csrf.init_app(app)
errors.init_app(app)

app.jinja_env.add_extension('jinja2.ext.loopcontrols')

app.register_blueprint(main, url_prefix='/')
app.register_blueprint(admin, url_prefix='/admin')
app.register_blueprint(user, url_prefix='/user')
app.register_blueprint(results, url_prefix='/results')
app.register_blueprint(calendar, url_prefix='/calendar')
app.register_blueprint(tutorials, url_prefix='/tutorials')
app.register_blueprint(disclaimer, url_prefix='/disclaimer')

celery = make_celery(app)


@app.context_processor
def inject_user():
	return dict(user=current_user)

#@app.errorhandler(DatabaseError)
#def special_exception_handler(error):
#    return 'Database connection failed', 500

@app.template_filter()
def datefilter(value, format='%m/%d/%y'):
	import datetime as dt
	date = dt.datetime.strptime(value, '%Y-%m-%d')
	return date.strftime(format)

@app.template_filter()
def date_slash(value, format='%m/%d/%Y'):
	import datetime as dt
	date = dt.datetime.strptime(value, '%Y-%m-%d')
	return date.strftime(format)

@app.template_filter()
def title_id(title):
	import re
	return re.sub(' ', '_', title)

app.jinja_env.filters['datefilter'] = datefilter
app.jinja_env.filters['date_slash'] = date_slash
app.jinja_env.filters['title_id']   = title_id


@user_registered.connect_via(app)
def user_registered_sighandler(app, user, confirm_token):
	user_datastore = SQLAlchemyUserDatastore(db, User, Role)
	default_role = user_datastore.find_role("user")
	user_datastore.add_role_to_user(user, default_role)
	db.session.commit()
'''