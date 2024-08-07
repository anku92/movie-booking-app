
directory: desktop---->movie-booking-app
                  _________________|______________________
                  |                  |                   |
             (data folder)      (Main app folder)      (Main app folder)
               dummy_data    movie_booking_django     movie_booking_react
  contains-->  3 js files    project & app folder     react appfiles (public, src etc.)

#########################################################################################

DJANGO SETUP:
1> setup virtual environment in desktop:
      a> create virtual environment on desktop: py -m venv myEnv
      b> activate venv: py -m venv myEnv
2> activate virtual environment  ..desktop > myEnv\Scripts\activate.bat
3> while in folder movie_booking_django
      a> Install dependencies: pip install -r requirements.txt
      b> then run command: py manage.py migrate

REACT SETUP:
1> Install dependencies: npm install while in movie_booking_react folder