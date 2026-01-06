from rest_framework import permissions

class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Allow read-only requests for everyone
        if request.method in permissions.SAFE_METHODS:
            return True
        # Only allow edits/deletes if the user is the author
        return obj.author == request.user
