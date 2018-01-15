from django.conf import settings
from django.conf.urls import include, url
from rest_framework import routers

from .decorators import tokens_required
from . import views


router = routers.DefaultRouter()
router.register(r'surveys', views.SurveyViewset, base_name='surveys')
router.register(r'masks', views.MaskViewset, base_name='masks')

urlpatterns = [
    url(r'^ui/', include(router.urls)),
]


for app_name in settings.GATHER_APPS:
    urlpatterns.append(
        url(r'^{}/(?P<path>.*)$'.format(app_name),
            tokens_required(views.TokenProxyView.as_view(app_name=app_name)),
            name='{}-proxy'.format(app_name))
    )
