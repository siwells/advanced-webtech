# coding: utf-8
# as per http://www.python.org/dev/peps/pep-0263/

import couchdb

from couchdb.http import PreconditionFailed, ResourceNotFound, ResourceConflict

def init_db(name, url):
    """
    Check whether the database 'name' exists on the couchdb server at url. If so, return reference to the server object. Otherwise create a new DB called name at url then return the new server object.
    
    Return: A CouchDB database object
    """   
    global db
    server = couchdb.client.Server(url)

    try: 
        db = server.create(name)
    except PreconditionFailed:
        db = server[name]
    except:
        print "Failed to connect to the SUPERHUB users database. Is the CouchDB server running?"
        exit(1)
    return db

def add_views(db):
    """
    Adds view functions to the specified db
    """
    
    search_fun = '''function(doc) { emit(doc.email, doc); }'''
    design_doc = { 'views': { 'get_email': { 'map': search_fun}}}
    
    try: 
        db["_design/emails"] = design_doc
    except ResourceConflict:
        pass
        
def entries_for_user(db):
    """

    """
    search_fun = '''function(doc) { emit(doc.uuid, doc); }'''
    design_doc = { 'views': { 'get_entries': { 'map': search_fun}}}

    try: 
        db["_design/entries"] = design_doc
    except ResourceConflict:
        pass

