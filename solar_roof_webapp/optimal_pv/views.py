from django.shortcuts import render

# Create your views here.

def page(request):
    content_dict = {'title':'Digital SolarRoof'}
    return render(request, 'landing_page/index.html', context=content_dict, content_type=None, status=None, using=None)
