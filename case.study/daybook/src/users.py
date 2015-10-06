# coding: utf-8
# as per http://www.python.org/dev/peps/pep-0263/

import bcrypt
import couchdb
import uuid

def add_user(db, email, password, first_name, last_name, lang):
    """
    Add a user to the specified DB using the supplied information
    
    Return the uuid (string) of the new user or None
    """
    new_uuid = str(uuid.uuid4())
    #if not exists_uuid(db, new_uuid):
    #    if not exists_email(db, email):
    salt = bcrypt.gensalt()

    pw_crypted = bcrypt.hashpw(password, salt)
    
    user_doc = { "email": email, "uuid": new_uuid, "password_hash": pw_crypted, "salt": salt, "first_name": first_name, "last_name": last_name, "default_language": lang, "verified": "false"}
    
    tmp_doc = db[new_uuid] = user_doc

    return tmp_doc['_id']

def check_password(db, email, password):
    """
    Takes in a email & password, then determines whether the password is valid
    
    Returns True if password is valid & False otherwise
    """
    doc = get_user(db, email=email)
    print doc
    if doc is not None:
        salt = doc['salt']
        pw_hash = doc['password_hash']    
        pw_crypted = bcrypt.hashpw(password, salt)
        if pw_hash == pw_crypted:
            return True
    print "No user document retrieved from " + str(db) + " for user " + email

def get_user(db, raw=True, uuid=None, email=None):
    """
    Get the document from the DB for the user specified by either uuid (preferred) or email address. If both are supplied then the doc retrieved by uuid will be returned first.
    """
    user_doc = None
    if uuid != None:
        if uuid in db:
            user_doc = db[uuid]
    elif email != None:
        for row in db.view('emails/get_email'):
            if row.key == email:
                user_doc = row.value
    if user_doc is not None:
        if raw is False:
            return json.dumps(user_doc)
        else:
            return user_doc

def get_uuid(db, email):
    """
    Return the users uuid given their email
    """
    for row in db.view('emails/get_email'):
        if row.key == email:
            user_doc = row.value
            return user_doc['uuid']

def set_password(db, uuid, new_pass):
    """

    """
    doc = None
    if uuid in db:
        doc = db[uuid]
        salt = doc['salt']
        pw_hash = bcrypt.hashpw(new_pass, salt)
        doc['password_hash'] = pw_hash
        doc_id, rev = db.save(doc)

        print "NEWPASS: "+new_pass+" hash: "+pw_hash

        return True
    else:
        print "User "+str(uuid)+" not found in DB"



