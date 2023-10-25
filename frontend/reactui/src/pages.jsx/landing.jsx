import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { NavLink } from "react-router-dom";


export async function loader(){
    try {
        const systemList = await axios.get(
            `${API_BASE_URL}/system`
        )
        return systemList.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export default function Landing(){

    const systems = useLoaderData()
    const navClassFunc = ({isActive})=>[
        isActive ? "bg-red-400": "",
        "h-[3rem] text-center pt-2 bg-red-300"
    ].join(" ")
    console.log(systems.length)
    return(
        <div className="w-[100vw] flex flex-row h-[100vh] border-2 border-yellow-500 justify-stretch">
            <div className="w-[15%] flex flex-col">
                {systems.map((system)=>{
                    return(
                            <NavLink to={system?.name} className={navClassFunc}>
                                    <p className=" text-center">{system?.name}</p>
                            </NavLink>
                    )
                })}
            </div>
            <Outlet className="w-full"/>
        </div>
    )
}



