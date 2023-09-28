from django.shortcuts import render


def about_view(request):
    #try:
        return render(request, "about.html")
    #except:
        #raise Http404("Page not found")

def telegram_view(request):
    #try:
        return render(request, "about.html")
    #except:
        #raise Http404("Page not found")



# Create your views here.
