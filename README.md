# MagicMirror
Final project for IoT

## Install Instructons ##
### Backend ###
```
// create virtual python environment
$ virtualenv venv

// source it for this terminal
$ source venv/bin/activate

// install requited libraries to virtual environment
$ pip install -r requirements.txt

// fire up backend server
$ cd backend/
$ python manage.py runserver
```
 
### Frontend ###
```
$ cd frontend/

// replace [PORT] with your desired port #
$ python3 -m http.server [PORT]
```
Then just navigate to http://localhost:[PORT]
