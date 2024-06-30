from django.db import models

class Question(models.Model):
    question = models.CharField(max_length=300)
    option1 = models.CharField(max_length=100)
    option2 = models.CharField(max_length=100)
    option3 = models.CharField(max_length=100)
    option4 = models.CharField(max_length=100)
    correctIndex = models.IntegerField()
    
    def __str__(self):
        return self.question
