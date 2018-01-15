from django.conf import settings


def gather2(request):
    navigation_list = ['surveys', ]
    if settings.GATHER_ODK:
        navigation_list.append('surveyors')

    context = {
        'dev_mode': settings.DEBUG,
        'app_name': settings.APP_NAME,
        'org_name': settings.ORG_NAME,
        'navigation_list': navigation_list,
        'core_url': settings.GATHER_APPS['core']['url'],
    }

    if settings.GATHER_ODK:  # pragma: no cover
        context['odk_url'] = settings.GATHER_APPS['odk-importer']['url']

    if settings.GATHER_SYNC:  # pragma: no cover
        context['sync_url'] = settings.GATHER_APPS['couchdb-sync']['url']

    return context
