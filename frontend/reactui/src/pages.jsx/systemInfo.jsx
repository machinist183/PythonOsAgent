import React from "react";
import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { NavLink } from "react-router-dom";
import { table } from "@nextui-org/react";

export async function systemInfoLoader({params}){
    try {
        const retriewSystem = await axios.get(
            `${API_BASE_URL}/system/Ashish/`
        )

        return retriewSystem.data
        
    } catch (error) {
        console.log(error)
        return null
    }
}

export default function SystemInfo(){
    
    const systemInfo = useLoaderData()
    const verboseInfo = {
     
        "Name": systemInfo.name,
        "Operating System": systemInfo.os,
        "Processor": systemInfo.processor,
        "Number of Cores": systemInfo.num_cores,
        "Number of Threads": systemInfo.num_threads,
        "RAM (GB)": systemInfo.ram_gb,
        "Used RAM (GB)": systemInfo.used_ram_gb,
        "Available RAM (GB)": systemInfo.available_ram_gb,
        "Storage Free (GB)": systemInfo.storage_free_gb,
        "Storage Total (GB)": systemInfo.storage_total_gb,
        "Storage Used (GB)": systemInfo.storage_used_gb,
       
      };
    
    const tableRows = [];

    for (const [key, value] of Object.entries(verboseInfo)) {
        tableRows.push(
          <tr key={key} className="border-2 border-black">
            <td>{key}</td>
            <td>{value}</td>
          </tr>
        );
      }
    return(
        
        <table className="h-1/2 min-w-fit w-full">
            <tbody>
                {tableRows}
            </tbody>
        </table>
    )
}