# Generated by Django 2.2 on 2019-04-29 11:39

from django.conf import settings
import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion
import uuid


if settings.MULTITENANCY:
    run_before_multitenancy = [
        ('multitenancy', '0001_initial'),
    ]
else:
    run_before_multitenancy = []


class Migration(migrations.Migration):

    initial = True

    run_before = run_before_multitenancy

    replaces = [
        ('gather', '0001_initial'),
        ('gather', '0002_project'),
        ('gather', '0003_auto_20180123_1649'),
        ('gather', '0004_delete_project'),
        ('gather', '0005_verbose_name'),
        ('gather', '0006_usertokens_couchdb_sync_token'),
    ]

    dependencies = [
        ('auth', '0008_alter_user_username_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserTokens',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='app_tokens', serialize=False, to=settings.AUTH_USER_MODEL, verbose_name='user')),
                ('kernel_token', models.CharField(blank=True, help_text='This token corresponds to an Aether Kernel authorization token linked to this user.', max_length=40, null=True, verbose_name='Aether Kernel token')),
                ('odk_token', models.CharField(blank=True, help_text='This token corresponds to an Aether ODK authorization token linked to this user.', max_length=40, null=True, verbose_name='Aether ODK token')),
                ('couchdb_sync_token', models.CharField(blank=True, help_text='This token corresponds to an Aether CouchDB-Sync authorization token linked to this user.', max_length=40, null=True, verbose_name='Aether CouchDB-Sync token')),
            ],
            options={
                'default_related_name': 'app_tokens',
                'verbose_name': 'user authorization tokens',
                'verbose_name_plural': 'users authorization tokens',
            },
        ),
        migrations.CreateModel(
            name='Survey',
            fields=[
                ('project_id', models.UUIDField(default=uuid.uuid4, help_text='This ID corresponds to an Aether Kernel project ID.', primary_key=True, serialize=False, verbose_name='project ID')),
                ('name', models.TextField(blank=True, default='', null=True, verbose_name='name')),
            ],
            options={
                'default_related_name': 'surveys',
                'verbose_name': 'survey',
                'verbose_name_plural': 'surveys',
            },
        ),
        migrations.CreateModel(
            name='Mask',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(verbose_name='name')),
                ('columns', django.contrib.postgres.fields.ArrayField(base_field=models.TextField(verbose_name='column internal name'), help_text='Comma separated list of column internal names', size=None, verbose_name='masked columns')),
                ('survey', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='masks', to='gather.Survey', verbose_name='survey')),
            ],
            options={
                'default_related_name': 'masks',
                'unique_together': {('survey', 'name')},
                'verbose_name': 'mask',
                'verbose_name_plural': 'masks',
            },
        ),
    ]
