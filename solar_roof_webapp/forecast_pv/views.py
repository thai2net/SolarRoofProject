from django.shortcuts import render

# Create your views here.
# Create your views here.

def page(request):
    content_dict = {'title':'Solar Forecast'}
    return render(request, 'forecast_pv/forecast_page.html', context=content_dict, content_type=None, status=None, using=None)
