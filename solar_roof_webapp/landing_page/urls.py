from . import views
from django.conf.urls import url

app_name = 'landing_page'

urlpatterns = [
    url(r'^$', views.index, name='index')
]
