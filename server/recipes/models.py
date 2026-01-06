# recipes/models.py
from django.db import models
from django.contrib.auth.models import User

class Recipe(models.Model):
    CATEGORY_CHOICES = [
        ('dessert', 'Dessert'),
        ('appetizer', 'Appetizer'),
        ('snack', 'Snack'),
        ('main', 'Main course'),
        ('beverage', 'Beverage'),
        ('salad', 'Salad'),
        ('soup', 'Soup'),
    ]

    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recipes')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    ingredients = models.TextField(blank=True)  # plain text lines
    steps = models.TextField(blank=True)        # plain text lines
    image = models.ImageField(upload_to='recipes/', blank=True, null=True)
    difficulty = models.CharField(max_length=50, default='medium')
    cooking_time = models.IntegerField(default=0)  # minutes
    servings = models.IntegerField(default=1)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='main')  
    likes = models.ManyToManyField(User, related_name='liked_recipes', blank=True)
    views = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookmarks')
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='bookmarked_by')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'recipe')

    def __str__(self):
        return f'{self.user.username} → {self.recipe.title}'

class Comment(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment by {self.author.username} on {self.recipe.title}'
