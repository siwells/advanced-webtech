import ConfigParser

from flask import Flask

def init(app):
    config = ConfigParser.ConfigParser()
    try:
        config_location = "etc/defaults.cfg"
        config.read(config_location)
        
        app.config['DEBUG'] = config.get("flaskapp", "debug")
        app.config['ip_address'] = config.get("flaskapp", "ip_address")
        app.config['port'] = config.get("flaskapp", "port")
        app.config['url'] = config.get("flaskapp", "url")
    except:
        print "Could not read configs from: ", config_location

