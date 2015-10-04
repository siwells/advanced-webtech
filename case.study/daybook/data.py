# coding: utf-8
# as per http://www.python.org/dev/peps/pep-0263/

import couchdb
import json

def add_entry(db, uuid, entry):
    doc = {"uuid": uuid, "data": entry}
    doc_id = db.save(doc)

def get_entries(db, uuid):
    entries = []
    for row in db.view('entries/get_entries'):
        if row.key == uuid:
            entries.append(row.value['data'])
    return entries

def get_entry_count(db, uuid):
    count = 0
    for row in db.view('entries/get_entries'):
        if row.key == uuid:
            count = count + 1
    return count

def get_entry_list(db, uuid):
    entrylist = []
    idx = 1
    for row in db.view('entries/get_entries'):
        if row.key == uuid:

            entrylist.append( {"id": idx, "date": row.value['data']['date']})
            idx = idx + 1
    return entrylist


