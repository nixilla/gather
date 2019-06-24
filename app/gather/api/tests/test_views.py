from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model

from ...settings import ES_CONSUMER_URL


class ViewsTest(TestCase):
    def setUp(self):
        super(ViewsTest, self).setUp()

        username = 'test'
        email = 'test@example.com'
        password = 'testtest'
        get_user_model().objects.create_user(username, email, password)
        self.assertTrue(self.client.login(username=username, password=password))

    def test__get_es_consumer_url(self):
        url = reverse('consumer-url')
        print('URL', url)
        self.assertEqual(url, '/api/gather/consumer-url/')

        response = self.client.get(url)
        self.assertEqual(response.json(), ES_CONSUMER_URL)
