from rest_framework.routers import DefaultRouter
from .views import SystemViewSet

router = DefaultRouter()
router.register(r'system', SystemViewSet, basename='system')
urlpatterns = router.urls