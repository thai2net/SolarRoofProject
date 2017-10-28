from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

# Create your views here.

def page(request):


    return render(request, 'ml/ml_page.html', context=None, content_type=None, status=None, using=None)

@api_view(['GET', 'POST', ])
def optimal_train(request):

    data= {"test": "ggwp" }

    return Response(data)
