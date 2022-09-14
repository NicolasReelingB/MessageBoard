from rest_framework import permissions

class IsUserorReadOnly(permissions.BasePermission):
    message = 'Cannot change current user'

    def has_object_permission(self, request, view, obj):

        if request.method in permissions.SAFE_METHODS:
            return True
        else:
            return request.user == obj
        
