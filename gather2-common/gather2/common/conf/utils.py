import os

from django.conf import settings
from django.conf.urls import include, url

from django.contrib import admin
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse

from rest_framework.authentication import BasicAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated

from gather2.common.auth.views import obtain_auth_token
from gather2.common.core.views import check_core
from gather2.common.health.views import health


# Taken from: http://glitterbug.in/blog/serving-protected-files-from-nginx-with-django-11/show/
def media_serve(request, path, *args, **kwargs):  # pragma: no cover
    '''
    Redirect the request to the path used by nginx for protected media.
    '''

    response = HttpResponse(status=200, content_type='')
    response['X-Accel-Redirect'] = os.path.join(settings.MEDIA_INTERNAL_URL, path)
    return response


@api_view(['GET'])
@authentication_classes([BasicAuthentication])
@permission_classes([IsAuthenticated])
def basic_serve(request, path, *args, **kwargs):  # pragma: no cover
    '''
    Redirect the request to the path used by nginx for protected media using BASIC Authentication.
    '''
    return media_serve(request, path, *args, **kwargs)


def generate_urlpatterns(token=False, core=False):  # pragma: no cover
    '''
    Generates the most common url patterns in the apps.

    Default URLs included:

        - the `/health` URL. Always responds with `200` status and an empty JSON object `{}`.
        - the `/admin` section URLs.
        - the `/accounts` URLs, checks if the REST Framework ones or the UMS ones.
        - the `debug toolbar` URLs only in DEBUG mode.
        - the `/media` URLS. The endpoint gives protected access
          (only logged in users) to media files.
        - the `/media-basic` URLS. The endpoint gives protected access
          (only logged in users with basic authentication) to media files.

    Based on the arguments:

        - `token`: indicates if the app should be able to create and return
                   user tokens via POST request and activates the URL.
                   The url endpoint is `/accounts/token`.

        - `core`: indicates if the app should have an URL that checks if
                  Gather2 Core Server is reachable with the provided environment
                  variables `GATHER_CORE_URL` and `GATHER_CORE_TOKEN`.
                  The url endpoint is `/check-core`.

    '''

    auth_urls = 'rest_framework.urls'
    if settings.CAS_SERVER_URL:
        import django_cas_ng.views

        auth_urls = [
            url(r'^login/$', django_cas_ng.views.login, name='login'),
            url(r'^logout/$', django_cas_ng.views.logout, name='logout'),
        ]

    urlpatterns = [

        # `health` endpoint
        url(r'^health', health, name='health'),

        # `admin` section
        url(r'^admin/', include(admin.site.urls)),

        # `accounts` management
        url(r'^accounts/', include(auth_urls, namespace='rest_framework')),

        # media files (protected)
        url(r'^media/(?P<path>.*)$', login_required(media_serve), name='media'),

        # media files (basic auth)
        url(r'^media-basic/(?P<path>.*)$', basic_serve, name='media-basic'),

    ]

    if settings.DEBUG:
        if 'debug_toolbar' in settings.INSTALLED_APPS:
            import debug_toolbar

            urlpatterns += [
                url(r'^__debug__/', include(debug_toolbar.urls)),
            ]

    if token:
        # generates users token
        urlpatterns += [
            url(r'^accounts/token', obtain_auth_token, name='token'),
        ]

    if core:
        # checks if Core server is available
        urlpatterns += [
            url(r'^check-core$', check_core, name='check-core'),
        ]

    return urlpatterns
