import React, { useState } from "react";
import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { Table ,TableBody ,TableRow ,TableHeader,TableColumn ,TableCell } from "@nextui-org/react";

export async function processInfoLoader({params}){
    try {
        const retriewProcesses = await axios.get(
            `${API_BASE_URL}/get_processes/Ashish`
        )
        return retriewProcesses.data
        
    } catch (error) {
        console.log(error)
        return null
    }
}


export default function ProcessesInfo() {
  const data = useLoaderData()
  const [expandedProcess, setExpandedProcess] = useState(null);

  const toggleSubprocesses = (id) => {
    if (expandedProcess === id) {
      setExpandedProcess(null);
    } else {
      setExpandedProcess(id);
    }
  };

  return (
    <div className="w-[100%] overflow-y-scroll flex-grow">
         <table className="table-fixed border-2 border-black text-center w-full ">
        <thead className="text-red-400 sticky top-0 bg-slate-700 h-[3rem]">
            <tr>
                <th className="w-[2%] border-2 border-black"></th>
                <th className="w-[30%]">Name</th>
                <th className="w-[20%]">Memory Usage (MB)</th>
                <th className="w-[25%]">CPU Usage (%)</th>
                <th className="w-[25%]">PPID</th>
            </tr>
        </thead>
        <tbody className="overflow-y-scroll">
            {data.map((process) => (
            <React.Fragment key={process.id}>
                <tr onClick={() => toggleSubprocesses(process.id)}
                             className={`hover:bg-slate-400 ${expandedProcess === process.id ? "bg-slate-900 text-white" :""} `}>
                    <td className="border-2 border-black">{process.subprocesses.length > 0 && ">"}</td>
                    <td>{process.name}</td>
                    <td>{process.memory_usage_mb}</td>
                    <td>{process.cpu_usage_percent}</td>
                    <td>{process.ppid}</td>
                </tr>
                {expandedProcess === process.id &&
                process.subprocesses.length > 0 && (
                    <tr className="">
                        <td colSpan="6"> 
                            <table className=" border-2 border-black w-full text-center">
                                {/* <thead>
                                    <tr className="border-2 border-yellow-700">
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Memory Usage (MB)</th>
                                    <th>CPU Usage (%)</th>
                                    <th>PPID</th>
                                    </tr>
                                </thead> */}
                                <tbody className="ml-2 bg-gray-300">
                                    {process.subprocesses.map((subprocess) => (
                                    <tr key={subprocess.id} >
                                        <td className="w-[32%]">{subprocess.name}</td>
                                        <td className="w-[20%]">{subprocess.memory_usage_mb}</td>
                                        <td className="w-[25%]">{subprocess.cpu_usage_percent}</td>
                                        <td className="w-[25%]">{subprocess.ppid}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                )}
            </React.Fragment>
            ))}
        </tbody>
    </table>

    </div>
   
  );
};
