import unittest
import testing

class TestingTest(unittest.TestCase):
  def test_root(self):
    self.app = testing.app.test_client()
    out = self.app.get('/')
    assert '200 OK' in out.status
    assert 'charset=utf-8' in out.content_type
    assert 'text/html' in out.content_type

if __name__ == "__main__":
  unittest.main()

