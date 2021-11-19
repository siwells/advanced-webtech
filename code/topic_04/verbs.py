from flask import Flask, request
app = Flask(__name__)

@app.route("/account/", methods=['GET', 'POST'])
def account():
  if request.method == 'POST':
    return "POST'ed to /account root\n"
  else:
    return "GET /account root"

if __name__ == "__main__":
  app.run(host='0.0.0.0', debug=True)

