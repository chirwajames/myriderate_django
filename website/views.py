from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from .models import *
from django.db.models import Sum
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import *
from django.contrib.auth.views import LoginView
from django.urls import reverse_lazy
from django.contrib.auth.hashers import make_password
import json
from django.views.decorators.csrf import csrf_exempt
# Create your views here.



@login_required
def home(request):

    return render(request, 'website/index.html')


#Properly Research this functionality below.
@csrf_exempt
def trip_json(request):
    '''
    if request.method == 'POST':
        my_start_destination = request.POST.get('start_destination')
        my_end_destination = request.POST.get('driver_rate')
        my_travel_cost = request.POST.get('driver_rate')
        print('the start destination was:', my_start_destination)
        return redirect('homepage')
    '''
    start_destination = request.GET.get('start_destination')
    end_destination = request.GET.get('end_destination')
    print('Print Value')
    print(request.user.driverprofile.username, 'Logged In User Is me!!')
    data = {}
    data['result'] = True
    data['message'] = "Form data saved"

    JounrneyInfo.objects.create(start_destination=start_destination, end_destination=end_destination)
    return JsonResponse(data)

def my_logout(request):
    print('Loggin out {}'.format(request.user))
    logout(request)
    print(request.user)
    return redirect('login')
# Function below just updates users pic
def update_pic(request):

    if request.method == 'POST':

        profile_form = ProfileUpdateForm(request.POST, request.FILES, instance=request.user.driverprofile)
        if profile_form.is_valid():
            profile_form.save()

        return redirect('profile')

    else:
        profile_form = ProfileUpdateForm(instance=request.user.driverprofile)

    context = {
        'p_form': profile_form
    }
    return render(request, 'website/profile.html',context)

# Function below just updates users rate
@login_required
def profile(request):

    if request.method == 'POST':
        #p_form = ProfileUpdateForm(request.POST)
        my_rate = request.POST.get('driver_rate')
        print(my_rate, 'Read My Rate')
        profile_form = ProfileUpdateForm(request.POST, request.FILES, instance=request.user.driverprofile)
        if profile_form.is_valid():
            profile_form.save()

        DriverProfile.objects.all().update(rate=my_rate)
        return redirect('profile')
        #return render(request, 'website/profile.html')

    else:
        profile_form = ProfileUpdateForm(instance=request.user.driverprofile)

    driver_rate = DriverProfile.objects.values()
    print(request.user.driverprofile.username)
    print(request.user.driverprofile.image)
    #info = request.user.driver_profile.order_set.all()
    #print(info)
    #print(driver_rate['rate'])

    context = {
        'rate': driver_rate,
        'p_form': profile_form
    }
    return render(request, 'website/profile.html',context)


# Function below just registers new users

def register(request):
    form = CreateUserForm()
    if request.method == 'POST':
        form = CreateUserForm(request.POST)

        # Need to hash password when registering user
        if form.is_valid():
            # Once form is valid, populate driver profile
            #driver_p =

            user = form.save(commit=False)
            # Hashing Password before saving form complete
            user.set_password(form.cleaned_data.get('password'))
            firstname = form.cleaned_data.get('first_name')
            lastname = form.cleaned_data.get('last_name')
            username = form.cleaned_data.get('username')
            email = form.cleaned_data.get('email')

            #password = form.cleaned_data.get('')
            DriverProfile.objects.create(firstname=firstname, lastname=lastname, username=username, email=email)
            user.save()
            messages.success(request, f"Account created for " + username)
            return redirect('login')

    context = {
        'registerform': form
    }
    print('Not Valid')
    return render(request, 'website/register.html', context)


'''
class MyLoginView(LoginView):

    form = LoginForm()
    redirect_authenticated_user = True

    def get_success_url(self):
        return reverse_lazy('homepage')

    def form_invalid(self, form):
        print('About to login 2024!')
        messages.error(self.request, 'Invalid Username or password!')
        return self.render_to_response(self.get_context_data(form=form))

'''

def my_login(request):

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            print(user)
            login(request,user)
            return redirect('homepage')
        else:
            messages.error(request, f"Incorrect Username or password, please try again!")
            return redirect('login')
    context = {}
    return render(request,'website/login.html', context)


def daily_log(request):
    # retrieve all rows from the table.
    journey_info = JounrneyInfo.objects.all()
    #Calculate the sum of cost column from db
    sum_profit = JounrneyInfo.objects.aggregate(Sum('cost'))
    print(sum_profit['cost__sum'])
    money_made = sum_profit['cost__sum']
    # Calculate total kilometers travelled
    km_travelled = JounrneyInfo.objects.aggregate(Sum('km_travelled'))
    km = km_travelled['km_travelled__sum']
    print('km:', km)


    context = {
        'journey_info': journey_info,
        'money_made': money_made,
        'km': km
    }
    return render(request, 'website/table.html', context)