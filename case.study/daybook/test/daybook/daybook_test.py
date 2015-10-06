import os
import daybook
import unittest

class DaybookRoot(unittest.TestCase):

    def test_root(self):
        self.app = daybook.app.test_client()
        out = self.app.get('/')        
        assert '200 OK' in out.status
        assert 'charset=utf-8' in out.content_type
        assert 'text/html' in out.content_type

class DaybookNewEntry(unittest.TestCase):

    def test_new_entry(self):
        self.app = daybook.app.test_client()
        out = self.app.get('/entry')
        assert '200 OK' in out.status
        assert 'charset=utf-8' in out.content_type
        assert 'text/html' in out.content_type

class DaybookDiaryEntries(unittest.TestCase):

    def test_diary_entries(self):
        self.app = daybook.app.test_client()
        out = self.app.get('/diary')

        assert '200 OK' in out.status
        assert 'charset=utf-8' in out.content_type
        assert 'text/html' in out.content_type


if __name__ == "__main__":
    
    unittest.main()
