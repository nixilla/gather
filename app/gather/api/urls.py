from django.conf import settings
from django.contrib.auth.decorators import login_required

from rest_framework import routers

from aether.common.conf.urls import url_pattern as url, include

from .decorators import tokens_required
from . import views


router = routers.DefaultRouter()
# create `mappings` entry for concordance with aether
router.register('mappings', views.SurveyViewSet, base_name='mappings')
router.register('surveys', views.SurveyViewSet, base_name='surveys')
router.register('masks', views.MaskViewSet, base_name='masks')

urlpatterns = [
    url(r'^gather/', include(router.urls)),
]


for app_name in settings.AETHER_APPS:
    urlpatterns.append(
        url(r'^{}/(?P<path>.*)$'.format(app_name),
            login_required(tokens_required(views.TokenProxyView.as_view(app_name=app_name))),
            name='{}-proxy'.format(app_name))
    )
