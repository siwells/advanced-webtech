from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def hello():
    return render_template('index.html')

@app.route("/q1/")
def q1():
    return render_template('q1.html')

@app.route("/q1w/")
def q1w():
    return render_template('q1w.html')

@app.route("/q2/")
def q2():
    return render_template('q2.html')

@app.route("/q2w/")
def q2w():
    return render_template('q2w.html')

@app.route("/q3/")
def q3():
    return render_template('q3.html')

@app.route("/q3w/")
def q3w():
    return render_template('q3w.html')

@app.route("/success/")
def success():
    return render_template('success.html')
    
if __name__ == "__main__":
    app.run(host="0.0.0.0")
