from flask import Flask, redirect, url_for
app = Flask(__name__)

@app.route("/login")
def login():
    return "Now we would display a login form to get user:pass"

@app.route("/private")
def private():
    # Test for user logged in failed
    # so redirect to login URL
    return redirect(url_for('login'))

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
