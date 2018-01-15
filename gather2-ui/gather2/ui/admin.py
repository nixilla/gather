from django.contrib import admin

from .api import models


class UserTokensAdmin(admin.ModelAdmin):

    list_display = (
        'user',
        'core_token',
        'odk_importer_token',
        'couchdb_sync_token',
    )


class SurveyAdmin(admin.ModelAdmin):

    list_display = (
        'survey_id',
        'name',
    )


class MaskAdmin(admin.ModelAdmin):

    list_display = (
        'survey',
        'name',
        'columns',
    )


admin.site.register(models.UserTokens, UserTokensAdmin)
admin.site.register(models.Survey, SurveyAdmin)
admin.site.register(models.Mask, MaskAdmin)
