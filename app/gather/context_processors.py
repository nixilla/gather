from django.conf import settings


def gather_context(request):
    navigation_list = ['surveys', ]
    if settings.AETHER_ODK:
        navigation_list.append('surveyors')

    context = {
        'dev_mode': settings.DEBUG,
        'app_name': settings.APP_NAME,
        'navigation_list': navigation_list,
        'kernel_url': settings.AETHER_APPS['kernel']['url'],

        # FIXME: This should be requested to the user by the app and saved in the DB.
        # So far just hardcoded it as an environment variable
        'project_name': settings.PROJECT_NAME,
        'project_id': settings.PROJECT_ID,
    }

    if settings.AETHER_ODK:  # pragma: no cover
        context['odk_url'] = settings.AETHER_APPS['odk']['url']

    return context
