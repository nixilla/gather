# Gather2 common

This module contains the shared features among different containers.

All the features that can be re-use in other containers and are container
"agnostic" should be moved to this module.

## Sections

### Auth section

Includes the methods that allow:

#### To create "admin" users via command.

```bash
# arguments: -u=admin -p=secretsecret -e=admin@gather2.org -t=01234656789abcdefghij
./manage.py setup_admin -p=$ADMIN_PASSWORD -t=$ADMIN_TOKEN
```

#### To create "users" with auth token via POST request.

Include the view entry in the ``urls.py`` file.

```python
from django.conf.urls import url
from gather2.common.auth.views import obtain_auth_token


urlpatterns = [
    url(r'^get-token', obtain_auth_token, name='token'),
]
```

### Health section

Includes the methods that allow:

#### To check if the system is up.

Include the view entry in the ``urls.py`` file.

```python
from django.conf.urls import url
from gather2.common.health.views import health


urlpatterns = [
    url(r'^health', health, name='health'),
]
```

### Core section

Includes the methods that allow:

#### To check connection to Gather2 Core Server.

Include the view entry in the ``urls.py`` file.

```python
from django.conf.urls import url
from gather2.common.core.views import check_core


urlpatterns = [
    url(r'^check-core', check_core, name='check-core'),
]
```

Indicates if the app should have an URL that checks if
Gather2 Core Server is reachable with the provided environment
variables `GATHER_CORE_URL` and `GATHER_CORE_TOKEN`.

Possible responses:

- `Always Look on the Bright Side of Life!!!` ✘
- `Brought to you by eHealth Africa - good tech for hard places` ✔

#### To submit responses linked to an existing survey.

```python
  gather2.common.core.utils.submit_to_core(response, survey_id, response_id=None)
```

### Conf section

#### Settings

Import this line in the ``settings.py`` file to have the common app settings.

```python
# Common settings
# ------------------------------------------------------------------------------

from gather2.common.conf.settings import *  # noqa
```

#### URLs

Include this in the ``urls.py`` file to generate default `urlpatterns`
based on the app settings.

```python
from .conf.utils import generate_urlpatterns

urlpatterns = generate_urlpatterns(core=True, token=True) + [
  # app specific urls
]
```

Default URLs included:

  - the `/health` URL. Always responds with `200` status and an empty JSON object `{}`.
  - the `/admin` section URLs.
  - the `/accounts` URLs, checks if the REST Framework ones or the UMS ones.
  - the `debug toolbar` URLs only in DEBUG mode.
  - the `/media` URLS. The endpoint gives protected access (only to logged in users) to media files.
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


## How to create the package distribution

Execute the following command in this folder.

```bash
  python setup.py bdist_wheel
```


## How to test the module

To ease the process the tests are run within a docker container.

```bash
  docker-compose -f docker-compose-test.yml run common-test test
```
