# recipes/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Recipe, Bookmark, Comment

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password')

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )


class RecipeSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    likes_count = serializers.SerializerMethodField()
    liked = serializers.SerializerMethodField()   # <-- add this field

    class Meta:
        model = Recipe
        fields = '__all__'   

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_liked(self, obj):
        """Return True if the current user has liked this recipe."""
        request = self.context.get('request')
        user = getattr(request, 'user', None)
        if user and user.is_authenticated:
            return obj.likes.filter(id=user.id).exists()
        return False

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['ingredients'] = [
            line.strip() for line in (instance.ingredients or '').splitlines() if line.strip()
        ]
        lines = [line.strip() for line in (instance.steps or '').splitlines() if line.strip()]
        data['steps'] = [line for line in lines]  # keep raw text; numbers handled in frontend
        return data


class BookmarkRecipeNestedSerializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField()
    liked = serializers.SerializerMethodField()   # <-- add liked here too

    class Meta:
        model = Recipe
        fields = (
            'id', 'title', 'image', 'difficulty',
            'cooking_time', 'servings', 'category',
            'likes_count', 'liked'
        )

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_liked(self, obj):
        request = self.context.get('request')
        user = getattr(request, 'user', None)
        if user and user.is_authenticated:
            return obj.likes.filter(id=user.id).exists()
        return False


class BookmarkSerializer(serializers.ModelSerializer):
    recipe = BookmarkRecipeNestedSerializer(read_only=True)
    recipe_id = serializers.PrimaryKeyRelatedField(
        queryset=Recipe.objects.all(),
        write_only=True,
        source='recipe'
    )

    class Meta:
        model = Bookmark
        fields = ('id', 'recipe', 'recipe_id', 'created_at')


class CommentSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Comment
        fields = ('id', 'author', 'text', 'created_at')
