'''
This urls are only used for testing purposes.
The app that includes this module should have its own urls list.
'''

from .conf.utils import generate_urlpatterns

urlpatterns = generate_urlpatterns(core=True, token=True)
