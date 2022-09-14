from rest_framework import permissions


class IsOwnerorReadOnly(permissions.BasePermission):
    message = 'Can\'t modify the current Message'

    def has_object_permission(self, request, view, obj):
        
        if request.method in permissions.SAFE_METHODS:
            return True

        else:
            return obj.author == request.user


    