import os

# Common settings
# ------------------------------------------------------------------------------

from gather2.common.conf.settings import *  # noqa
from gather2.common.conf.settings import INSTALLED_APPS, TEMPLATES, TESTING, STATIC_ROOT


# UI Configuration
# ------------------------------------------------------------------------------

ROOT_URLCONF = 'gather2.ui.urls'
WSGI_APPLICATION = 'gather2.ui.wsgi.application'

APP_NAME = 'Gather'
ORG_NAME = os.environ.get('GATHER_ORG_NAME', 'eHealth Africa')

DATA_UPLOAD_MAX_MEMORY_SIZE = 50 * 1024 * 1024  # 50MB

# Javascript/CSS Files:
WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': '/',  # used in prod
        'STATS_FILE': os.path.join(STATIC_ROOT, 'webpack-stats.json'),
    },
}

INSTALLED_APPS += [
    'webpack_loader',
    'gather2.ui',
]

TEMPLATES[0]['OPTIONS']['context_processors'] += [
    'gather2.ui.context_processors.gather2',
]

MIGRATION_MODULES = {
    'ui': 'gather2.ui.api.migrations'
}

# Gather2 external modules
# ------------------------------------------------------------------------------

GATHER_APPS = {}

# check the available modules linked to this instance
GATHER_MODULES = [
    x
    for x in map(str.strip, os.environ.get('GATHER_MODULES', '').split(','))
    if x
]


# CORE is always a linked module
core = {
    'token': os.environ.get('GATHER_CORE_TOKEN', ''),
    'url': os.environ.get('GATHER_CORE_URL', ''),
}
if TESTING:  # pragma: no cover
    core['url'] = os.environ.get('GATHER_CORE_URL_TEST', '')

if core['url'].strip() and core['token'].strip():  # pragma: no cover
    GATHER_APPS['core'] = core


# check if ODK is available in this instance
GATHER_ODK = False
if 'odk-importer' in GATHER_MODULES:  # pragma: no cover
    odk = {
        'token': os.environ.get('GATHER_ODK_TOKEN', ''),
        'url': os.environ.get('GATHER_ODK_URL', ''),
    }
    if TESTING:
        odk['url'] = os.environ.get('GATHER_ODK_URL_TEST', '')

    if odk['url'].strip() and odk['token'].strip():
        GATHER_APPS['odk-importer'] = odk
        GATHER_ODK = True


# check if SYNC is available in this instance
GATHER_SYNC = False
if 'couchdb-sync' in GATHER_MODULES:  # pragma: no cover
    sync = {
        'token': os.environ.get('GATHER_SYNC_TOKEN', ''),
        'url': os.environ.get('GATHER_SYNC_URL', ''),
    }
    if TESTING:
        sync['url'] = os.environ.get('GATHER_SYNC_URL_TEST', '')

    if sync['url'].strip() and sync['token'].strip():
        GATHER_APPS['couchdb-sync'] = sync
        GATHER_SYNC = True
