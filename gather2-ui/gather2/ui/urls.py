from django.conf import settings
from django.conf.urls import include, url
from django.contrib.auth.decorators import login_required
from django.views.generic import TemplateView

from gather2.common.conf.utils import generate_urlpatterns

# Any entry here needs the decorator `tokens_required` if it's going to execute
# AJAX request to any of the other apps
from .api.decorators import tokens_required


urlpatterns = generate_urlpatterns(core=True) + [

    # ----------------------
    # API
    url(r'', include('gather2.ui.api.urls')),
    url(r'^v1/', include('gather2.ui.api.urls', namespace='v1')),

    # ----------------------
    # Welcome page
    # url(r'^$',
    #     login_required(TemplateView.as_view(template_name='pages/index.html')),
    #     name='index-page'),

    url(r'^$',
        login_required(TemplateView.as_view(template_name='pages/index.html')),
        name='index-page'),
    # ----------------------
    # shows the current user app tokens
    url(r'^~tokens$',
        tokens_required(TemplateView.as_view(template_name='pages/tokens.html')),
        name='tokens'),

    url(r'^surveys/(?P<action>\w+)/(?P<survey_id>[0-9]+)?$',
        tokens_required(TemplateView.as_view(template_name='pages/surveys.html')),
        name='surveys'),

]

if settings.GATHER_ODK:  # pragma: no cover
    urlpatterns += [
        url(r'^surveyors/(?P<action>\w+)/(?P<surveyor_id>[0-9]+)?$',
            tokens_required(TemplateView.as_view(template_name='pages/surveyors.html')),
            name='surveyors'),
    ]
