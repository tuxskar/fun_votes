from django.http import JsonResponse
from django.views import View
from django.views.generic import TemplateView

from fun_votes.models import VOTES


class IndexView(TemplateView):
    template_name = "index.html"


class VotesInfoView(View):
    def get(self, request, *args, **kwargs):
        return JsonResponse(VOTES)
