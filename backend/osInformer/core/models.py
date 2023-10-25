from django.db import models

class System(models.Model):
    name = models.CharField(max_length=20 , unique=True , primary_key=True )
    os = models.CharField(max_length=100)
    processor = models.CharField(max_length=100)
    num_cores = models.IntegerField()
    num_threads = models.IntegerField()
    ram_gb = models.FloatField()
    available_ram_gb = models.FloatField()
    used_ram_gb = models.FloatField()
    storage_total_gb = models.FloatField()
    storage_used_gb = models.FloatField()
    storage_free_gb = models.FloatField()

class OsSnapshot(models.Model):
    system = models.ForeignKey(System, on_delete=models.CASCADE , related_name='os_snapshots')
    created_at = models.DateTimeField(auto_now_add=True)

class Process(models.Model):
    os_snapshot = models.ForeignKey(OsSnapshot , on_delete=models.CASCADE , related_name="processes")
    pid = models.IntegerField()
    name = models.CharField(max_length=200 , null=True, blank=True)
    memory_usage_mb = models.FloatField()
    cpu_usage_percent = models.FloatField()
    ppid = models.IntegerField()

class SubProcess(models.Model):
    process = models.ForeignKey(Process, on_delete=models.CASCADE , related_name="subprocesses")
    pid = models.IntegerField()
    name = models.CharField(max_length=200 , null=True , blank=True)
    ppid = models.IntegerField()
    memory_usage_mb = models.FloatField()
    cpu_usage_percent = models.FloatField()
