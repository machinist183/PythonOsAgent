# serializers.py
from rest_framework import serializers
from .models import Process, SubProcess , System

class SystemSerializer(serializers.ModelSerializer):
    class Meta:
        model = System
        fields = "__all__"

class SubProcessSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubProcess
        fields = '__all__'
        read_only_fields = ['process']

class ProcessSerializer(serializers.ModelSerializer):

    subprocesses = SubProcessSerializer(many=True , required = False)

    class Meta:
        model = Process
        fields = '__all__'

    def create(self, validated_data):

        subprocesses_data = validated_data.pop('subprocesses', []) 
        process = Process.objects.create(**validated_data)

        if len(subprocesses_data)>0:
            for subprocess_data in subprocesses_data:
                SubProcess.objects.create(process=process, **subprocess_data)

        return process
