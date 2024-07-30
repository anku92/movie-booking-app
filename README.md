**steps after downloading zip or cloning repo move movie-booking-app to desktop
::structure -> desktop
                |________movie-booking-app
                  ________________|______________________
                  |                  |                   |
              dummy_data    movie_booking_django    movie_booking_react

DJANGO SETUP (Note: have python installed)
1) setup virtual environment in desktop:
      i) ..\users\John\desktop > py -m venv <environment_name> (eg: py -m venv myEnv)
      ii) in command prompt: ..users\John\desktop > py -m venv myEnv


2) activate virtual environment  ..\users\John\desktop > myEnv\Scripts\activate.bat

and follow from step (a) below

a) go to directory: ..\desktop\cd movie-booking-app
b)then ..\desktop\movie-booking-app> cd movie_booking_django
you at -> ..\desktop\movie-booking-app/movie_booking_django>

c) use command: ..\desktop\movie-booking-app/movie_booking_django> pip install -r requirements.txt
after installation

d) use command: -> py manage.py makemigrations
e) use command: -> py manage.py migrate

final command after successful process run the commad py manage.py runserver
REACT APP SETUP
go to path "..\desktop\movie-booking-app/movie_booking_react>" & run command "npm install", then "npm start"
