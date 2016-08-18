### Fresh Ubuntu Install

    $ adduser user
    $ adduser user sudo

> $ su user (to switch user)

    $ sudo apt-get update
    $ sudo apt-get install -y python python-pip python-virtualenv nginx gunicorn
<!-- -->
    $ sudo apt-get install -y git nodejs npm
    $ sudo ln -s /usr/bin/nodejs /usr/bin/node

### Grunt

>  inside project directory (/home)

    $ sudo npm install -g grunt-cli
    $ sudo npm install grunt --save-dev
<!-- -->
    $ sudo npm install grunt-contrib-compass --save-dev
    $ sudo npm install grunt-contrib-concat --save-dev
    $ sudo npm install grunt-contrib-cssmin --save-dev
    $ sudo npm install grunt-contrib-jshint --save-dev
    $ sudo npm install grunt-contrib-nodeunit --save-dev
    $ sudo npm install grunt-contrib-sass --save-dev
    $ sudo npm install grunt-contrib-uglify --save-dev
    $ sudo npm install grunt-contrib-watch --save-dev

>  May or may not need this.

    $ sudo npm install -g minimatch@3.0.2
    $ sudo npm install -g jshint@2.5.11


### Bower

    $ sudo npm install bower -g

> bower.json

    $ sudo bower install --allow-root

### Git

> add keys to /root/.ssh

    $ sudo mkdir www
    $ sudo git clone git@github.com:DrLulz/DoseTaper.git .
    $ sudo git pull git@github.com:DrLulz/DoseTaper.git .


### VirtualEnv

>  inside project directory (/home)

    $ sudo virtualenv env
    $ source env/bin/activate
<!-- -->
    $ sudo pip install Flask


### Configure Nginx

    $ sudo /etc/init.d/nginx start
<!-- -->
    $ sudo rm /etc/nginx/sites-enabled/default
    $ sudo touch /etc/nginx/sites-available/dosetaper
<!-- -->
    server {

        access_log  /home/www/log/nginx_access.log;
        error_log  /home/www/log/nginx_error.log;

        location / {
            proxy_pass http://localhost:8000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        location /static {
            alias  /home/www/sectors/static/;
        }

    }
<!-- -->
    $ sudo ln -s /etc/nginx/sites-available/dosetaper /etc/nginx/sites-enabled/dosetaper
<!-- -->
    $ sudo /etc/init.d/nginx restart
<!-- -->
    $ cd /home/www/
    $ gunicorn run:app -b localhost:8000

### Supervisor

    $ sudo apt-get install -y supervisor
    $ sudo vim /etc/supervisor/conf.d/dosetaper.conf
<!-- -->
    [program:dosetaper]
    command = gunicorn run:app -b localhost:8000
    directory = /home/www/
    user = user
<!-- -->
    $ sudo pkill gunicorn
    $ sudo supervisorctl reread
    $ sudo supervisorctl update
    $ sudo supervisorctl start dosetaper