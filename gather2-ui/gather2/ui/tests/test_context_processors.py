import mock
from django.test import RequestFactory, TestCase

from ..context_processors import gather2


class ContextProcessorsTests(TestCase):

    def test_gather2(self):
        request = RequestFactory().get('/')

        self.assertEqual(gather2(request), {
            'dev_mode': False,
            'app_name': 'Gather',
            'org_name': 'eHealth Africa',
            'navigation_list': ['surveys', 'surveyors', ],
            'core_url': 'http://kernel-test:9000',
            'odk_url': 'http://odk-importer-test:9443',
        })

    @mock.patch('gather2.ui.context_processors.settings.GATHER_ODK', False)
    def test_gather2__mocked(self):
        request = RequestFactory().get('/')
        context = gather2(request)

        self.assertNotIn('odk_url', context)
        self.assertEqual(context['navigation_list'], ['surveys', ])
