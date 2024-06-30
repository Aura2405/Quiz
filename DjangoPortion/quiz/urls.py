from django.urls import path
from .views import QuestionDetailView, QuestionListCreateView

urlpatterns = [
    path('questions/', QuestionListCreateView.as_view(), name="question-list-create"),
    path('questions/<int:pk>/', QuestionDetailView.as_view(), name="question-detail")
]