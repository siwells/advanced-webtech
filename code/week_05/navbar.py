from flask import Flask, redirect, url_for, render_template
app = Flask(__name__)

@app.route("/")
def root():
  return render_template('navbar_root.html') 

@app.route("/page1/")
def page1():
  return render_template('navbar_page1.html')

@app.route("/page2/")
def page2():
  return render_template('navbar_page2.html')

@app.route("/page3/")
def page3():
  return render_template('navbar_page3.html')

if __name__ == "__main__":
  app.run(host='0.0.0.0', debug=True)
