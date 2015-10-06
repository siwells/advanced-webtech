Daybook Casestudy
=================

Daybook is a web-based daily diary for self-reporting travel during HCI studies. It was developed during the SUPERHUB EU project but is also useful as an exemplar of a non-trivial Python Flask app.

Running Daybook
===============

Daybook was originally deployed using uWSGI as the app server but it should run perfectly happyil using the Flask development server. Assuming that you have Pip, VirtualEnv and CouchDB installed, cd into the case.study/daybook/ directory then create a new virtualenv:
    $ cd case.study/daybook/
    $ virtualenv env

Start your virtualenv then install the external libraries using the supplied requirements.txt
    $ source env/bin/activate
    $ pip install -r requirements.txt

Now create a var/ directory to store log files from the running app and create an empty log file ready for data:
    $ mdkir var
    $ touch var/daybook.log

Start your CouchDB instance (we assume that once running it is available on localhost:5984). If not you may have to adjust the settings in case.study/daybook/etc/defaults.cfg
    $ couchdb

We want Daybook to run with the src directory as a sub-directory of our application root (mainly so that the etc/ and var/ directories are located correctly relative to the runing app) so cd to case/study/daybool then start the app:
    $ python src/daybook.py

Now open a browser and navigate to http://localhost:5000/

Run the tests
-------------

Add application src to the PYTHONPATH:
    $ PYTHONPATH=`pwd`/src/daybook

Run the tests:
    $ python test/daybook/daybook_test.py
