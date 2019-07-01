from django.test import TestCase
from django.contrib.auth import get_user_model


class ViewsTest(TestCase):
    def setUp(self):
        super(ViewsTest, self).setUp()

        username = 'test'
        email = 'test@example.com'
        password = 'testtest'
        get_user_model().objects.create_user(username, email, password)
        self.assertTrue(self.client.login(username=username, password=password))
