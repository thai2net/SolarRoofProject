from django import forms

class FormName(forms.Form):
    bill = forms.FloatField()
    houseSize = forms.FloatField()
