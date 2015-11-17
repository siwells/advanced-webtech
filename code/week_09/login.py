import bcrypt
from functools import wraps
from flask import Flask, redirect, render_template, request, session, url_for
from flask import Flask

app = Flask(__name__)
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'

valid_email = 'person@napier.ac.uk'
valid_pwhash = bcrypt.hashpw('secretpass', bcrypt.gensalt())

def check_auth(email, password):
    if(email == valid_email and 
        valid_pwhash == bcrypt.hashpw(password.encode('utf-8'), valid_pwhash)):
            return True
    return False

def requires_login(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        status = session.get('logged_in', False)
        if not status:
            return redirect(url_for('.root'))
        return f(*args, **kwargs)
    return decorated

@app.route('/logout/')
def logout():
    session['logged_in'] = False
    return redirect(url_for('.root'))

@app.route("/secret/")
@requires_login
def secret():
    return "Secret Page"

@app.route("/", methods=['GET', 'POST'])
def root():
    if request.method == 'POST':
        user = request.form['email']
        pw = request.form['password']
        
        if check_auth(request.form['email'], request.form['password']):
            session['logged_in'] = True
            return redirect(url_for('.secret'))
    return render_template('login.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)

