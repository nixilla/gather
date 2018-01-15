from django.conf import settings
from django.test import TestCase


class SettingsTest(TestCase):

    def test_default_variables(self):

        self.assertTrue(settings.TESTING)
        self.assertFalse(settings.DEBUG)

        self.assertFalse(settings.USE_X_FORWARDED_HOST)
        self.assertFalse(settings.USE_X_FORWARDED_PORT)
        self.assertEqual(settings.SECURE_PROXY_SSL_HEADER, None)

        self.assertEqual(settings.ROOT_URLCONF, 'gather2.ui.urls')
        self.assertEqual(settings.WSGI_APPLICATION, 'gather2.ui.wsgi.application')
        self.assertEqual(settings.APP_NAME, 'Gather')
        self.assertEqual(settings.ORG_NAME, 'eHealth Africa')
        self.assertEqual(settings.GATHER_MODULES, ['core', 'odk-importer'])

        self.assertIn('core', settings.GATHER_APPS)
        self.assertEqual(settings.GATHER_APPS['core']['url'], 'http://kernel-test:9000')

        self.assertTrue(settings.GATHER_ODK)
        self.assertIn('odk-importer', settings.GATHER_APPS)
        self.assertEqual(
            settings.GATHER_APPS['odk-importer']['url'],
            'http://odk-importer-test:9443'
        )

        self.assertFalse(settings.GATHER_SYNC)
        self.assertNotIn('couchdb-sync', settings.GATHER_APPS)
