from . import views
from django.conf.urls import url

app_name = 'optimal'

urlpatterns = [
    url(r'^$', views.page, name='forecast_page')
]
