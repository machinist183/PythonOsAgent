from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import ProcessSerializer , SystemSerializer 
from .models import OsSnapshot , System , Process
from rest_framework import generics , mixins
from rest_framework import viewsets

@api_view(['POST'])
def save_processes(request):
    data = request.data
 
    system_name = data['name']
    system = System.objects.get(name = system_name)
    osSnap = OsSnapshot.objects.create(system = system)
    processes = data["processes"]
    for process_data in processes:
        process_data['os_snapshot'] = osSnap.pk

    process_serializer = ProcessSerializer(data=processes, many=True)

    if process_serializer.is_valid():
        process_serializer.save()
        return Response({'message': 'Processes saved successfully!'}, status=status.HTTP_201_CREATED)
    else:
        return Response(process_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_processes(request, system_name):
    try:
        system = System.objects.get(name=system_name)
        latest_snapshot = OsSnapshot.objects.filter(system=system).latest('created_at')
        
        processes = Process.objects.filter(os_snapshot=latest_snapshot).prefetch_related('subprocesses')
        
        # Serialize processes including subprocesses
        serializer = ProcessSerializer(processes, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    except System.DoesNotExist:
        return Response({'error': 'System not found'}, status=status.HTTP_404_NOT_FOUND)
    except OsSnapshot.DoesNotExist:
        return Response({'error': 'No snapshots found for the system'}, status=status.HTTP_404_NOT_FOUND)
    except Process.DoesNotExist:
        return Response({'error': 'No processes found for the system'}, status=status.HTTP_404_NOT_FOUND)





class SystemViewSet(viewsets.ModelViewSet):
    
    model = System
    serializer_class = SystemSerializer
    queryset = System.objects.all()



