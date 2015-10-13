import ConfigParser, url_for

from flask import Flask

import configuration

app = Flask(__name__)

configuration.init(app)
configuration.logs(app)

@app.route('/')
def root():
        this_route = url_for('.root')
        app.logger.warn("Logging a test message from "+this.route)
        return "Hello Napier from the configuration testing app (Now with added logging)" 

if __name__ == '__main__':
    app.run(
        host=app.config['ip_address'], 
        port=int(app.config['port']), 
        threaded=app.config['threaded'])


