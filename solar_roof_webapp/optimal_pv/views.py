from django.shortcuts import render
from . import forms
from scipy.optimize import linprog
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

# Create your views here.

def page(request):
    form = forms.FormName()
    content_dict = {'title':'Solar Planner','form':form}

    if request.method == 'POST':
        form = forms.FormName(request.POST)

        if form.is_valid():
            '''
            Deal with Load Profile
            '''

            energy = form.cleaned_data['bill']

            data = pd.read_excel('dt13151011.xls')
            load_sample = data.iloc[3:98, 3]
            # load_sample = load_sample/np.max(load_sample)
            energy_sample = np.sum(load_sample)/4

            # scale load data to make energy equal to 1, so that if we have energy data we can sample this load profile
            load_scale_energy = load_sample/energy_sample
            scale = 0.6/1.4760870897413207
            load_test = load_scale_energy*scale*energy
            load_test = np.concatenate((load_test.reshape(95,1), np.array(load_test.iloc[-1]).reshape(1,1)))


            content_dict = {'title':'Solar Planner','form':form, 'bill':np.sum(load_test)}

    return render(request, 'optimal_pv/optimal-page.html', context=content_dict, content_type=None, status=None, using=None)

def optimal_sizing(load_test):
    pass

def import_pv_data():
    pv = pd.read_excel('SolarRadiance/2013-12-22.xls')
    pv_power = pv.iloc[5:, 16]/1000
    pv_power= pv_power.fillna(0)

    # convert pv data every 5 min to every 15 min
    count = 0
    pv_15 = []

    ##
    for i in range(pv_power.shape[0]):

        count += 1
        if count ==3:
            avg = np.sum(pv_power[i-2:i+1])/3
            pv_15.append(avg)
            count = 0

    off_peak_rate = 2.6296
    on_peak_rate = 4.3555
    ##
    tou = []
    for i in range(96):

        if i <=36 or i >36+52:
            tou.append(off_peak_rate)
        else:
            tou.append(on_peak_rate)

    ## PV cost and BESS cost
    cost_norm_inverter = 11.8*1000  # Baht/W
    cost_norm_pv = 37.5*1000        # Baht/W

    cost_pv = (cost_norm_inverter + cost_norm_pv)
    cost_pv = cost_pv*5

    bess_cost_kWh = 300*35
    bess_cost_kW = (0.71 + 0.21 + 0.57 + 0.15 + 0.75 + 0.06)*35*1000

    bess_cost_kWh = bess_cost_kWh/3
    bess_cost_kW = bess_cost_kW/3
