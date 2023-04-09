# AWS

* aws amplify setup
    * or refer to circleci.yml much easier
```sh
amplify configure
# modify the amplliy according
amplify env add # prod
amplify env remove dev # optional
amplify env checkout prod
amplify push --yes
amplify publish --yes
```

# Heroku 
* push to heroku
git subtree push --prefix [path/to/backend]  heroku master;
git subtree push --prefix /apps/zero/backend/python/flask/prod  heroku master;


* heroku tornado server
```Procfile
web: python tornado_heroku_server.py 0.0.0.0:\$PORT
heroku ps:scale web=1
```

* heroku flask with gevent
```Procfile
web: gunicorn -k gevent -w 1 prod_app:app
heroku ps:scale web=1
```

# Git

* daily git work    
```sh
git add .;git commit -m "[UPDATE] | fullstack |  updated template project structure" --author "WindMillCodeDev <>"  ;git push origin master

git add .;git commit -m "[UPDATE] updates to orders resource " ;git push origin michael-dev

git remote add origin git@github.com:WindMillCode/FLOSS.git
```

# Docker
```sh
sudo docker build -t windmillcode/angular-tornado-capybara:0.1.9 ruby-python-node
```
