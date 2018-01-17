from django.conf import settings
from django.test import TestCase


class SettingsTest(TestCase):

    def test_default_variables(self):

        self.assertTrue(settings.TESTING)
        self.assertFalse(settings.DEBUG)

        self.assertFalse(settings.USE_X_FORWARDED_HOST)
        self.assertFalse(settings.USE_X_FORWARDED_PORT)
        self.assertEqual(settings.SECURE_PROXY_SSL_HEADER, None)

        self.assertEqual(settings.ROOT_URLCONF, 'gather.urls')
        self.assertEqual(settings.WSGI_APPLICATION, 'gather.wsgi.application')
        self.assertEqual(settings.APP_NAME, 'Gather')
        self.assertEqual(settings.AETHER_MODULES, ['kernel', 'odk'])

        self.assertIn('kernel', settings.AETHER_APPS)
        self.assertEqual(settings.AETHER_APPS['kernel']['url'], 'http://kernel-test:9001')

        self.assertTrue(settings.AETHER_ODK)
        self.assertIn('odk', settings.AETHER_APPS)
        self.assertEqual(settings.AETHER_APPS['odk']['url'], 'http://odk-test:9002')

        # FIXME: This should be requested to the user by the app and saved in the DB.
        # So far just hardcoded it as an environment variable
        self.assertEqual(settings.PROJECT_NAME, 'Aether Sample Project')
        self.assertEqual(settings.PROJECT_ID, 'd3ee41be-e696-424b-8b45-ab6a0d787f6a')
