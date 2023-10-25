from django.contrib import admin
from .models import System , OsSnapshot , Process , SubProcess
# Register your models here.
admin.site.register(System)
admin.site.register(OsSnapshot)
admin.site.register(Process)
admin.site.register(SubProcess)