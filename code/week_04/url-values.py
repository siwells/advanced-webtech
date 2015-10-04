from flask import Flask
app = Flask(__name__)

@app.route("/hello/<name>")
def hello(name):
  return "Hello %s" % name

@app.route("/add/<int:first>/<int:second>")
def add(first, second):
  return str(first+second)

if __name__ == "__main__":
  app.run(host='0.0.0.0', debug=True)
