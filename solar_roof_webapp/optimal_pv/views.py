from django.shortcuts import render

# Create your views here.

def page(request):
    content_dict = {'title':'Solar Planner'}
    return render(request, 'optimal_pv/optimal-page.html', context=content_dict, content_type=None, status=None, using=None)
