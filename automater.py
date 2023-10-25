import platform
import psutil
import math
import sched
import time
import requests


API_BASE_URL = 'http://127.0.0.1:8000/api' 


def send_data_to_backend(url , data , startMessage , EndMessage):
    print(startMessage)
    response = requests.post(url , json=data)
    if response.status_code == 201: 
        print(EndMessage)
    else:
        print(response.text)


def send_system_info():
   
    system_info = {
        "name": platform.node(),  
        "os": platform.platform(),
        "processor": platform.processor(),
        "num_cores": psutil.cpu_count(logical=False),
        "num_threads": psutil.cpu_count(logical=True),
        "ram_gb": math.ceil(psutil.virtual_memory().total / (1024 ** 3)),
        "available_ram_gb": round(psutil.virtual_memory().available / (1024 ** 3)),
        "used_ram_gb": math.ceil(psutil.virtual_memory().used / (1024 ** 3)),
        "storage_total_gb": round(psutil.disk_usage("/").total / (1024 ** 3)),
        "storage_used_gb": round(psutil.disk_usage("/").used / (1024 ** 3)),
        "storage_free_gb": round(psutil.disk_usage("/").free / (1024 ** 3)),
        }

    send_data_to_backend(f'{API_BASE_URL}/system/' , data=system_info ,
                         startMessage="Sending System Info ...",EndMessage="System Data sent successfully")


def get_process_info():

    process_info = []

    for proc in psutil.process_iter(['pid', 'name', 'memory_info', 'cpu_percent', 'ppid','status']):
        p_info = proc.info
        p_info['memory_usage (MB)'] = round(p_info['memory_info'].rss / (1024 ** 2), 2)
        p_info['cpu_usage (%)'] = p_info['cpu_percent']
        process_info.append(p_info)

    process_info.sort(key=lambda x: x['memory_usage (MB)'], reverse=True)

    process_info.sort(key=lambda x: x['cpu_usage (%)'], reverse=True)

    return process_info

def send_processes_data():

    processes = []

    for proc in get_process_info():
        process = {
            'pid': proc['pid'],
            'name': proc['name'],
            'memory_usage_mb': proc['memory_usage (MB)'],
            'cpu_usage_percent': proc['cpu_usage (%)'],
            'ppid': proc['ppid'],
            'status':proc['status'],
            'subprocesses': []
        }

        try:
            sub_processes = psutil.Process(proc['pid']).children(recursive=True)
            for sub_proc in sub_processes:
                subprocess = {
                    'pid': sub_proc.pid,
                    'name': sub_proc.name(),
                    'memory_usage_mb': round(sub_proc.memory_info().rss / (1024 ** 2), 2),
                    'cpu_usage_percent': sub_proc.cpu_percent(),
                    'ppid': sub_proc.ppid(),
                    'status':sub_proc.status()
                }
                process['subprocesses'].append(subprocess)
        except psutil.NoSuchProcess:
            pass

        processes.append(process)

    data = {
        "processes" : processes,
        "name":platform.node()
    }


    send_data_to_backend(f'{API_BASE_URL}/ossnap/' , data=data ,
                          startMessage="Sending OS Processes Snapshot.....",
                          EndMessage="Processes Data Sent successfully")


if __name__ == "__main__":
   
   send_system_info()

   while True:
       send_processes_data()
       print("Sleeping for five minutes")
       time.sleep(300)
    
