from . import views
from django.conf.urls import url

app_name = 'ml'

urlpatterns = [
    url(r'^$', views.page, name='ml_page'),
    url(r'^ml_optimal_train', views.optimal_train, kwargs=None, name=None)
]
