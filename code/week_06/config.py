import ConfigParser

from flask import Flask

import configuration

app = Flask(__name__)

configuration.init(app)

@app.route('/')
def root():
        return "Hello Napier from the configuration testing app" 

if __name__ == '__main__':
    app.run(
        host=app.config['ip_address'], 
        port=int(app.config['port']), 
        threaded=app.config['threaded'])


