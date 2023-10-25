import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { NavLink } from "react-router-dom";

export async function loader({params}){
    return null 
}

export default function DataCategories(){

    const navClassFunc = ({isActive})=>[
        isActive ? "bg-red-400": "",
        "border-2 border-black h-[3rem] text-center pt-2"
    ].join(" ")
    return(
        <div className="flex flex-row w-full justify-stretch">
              <div className="flex flex-col w-[15%]">
                    <NavLink to="systeminfo" 
                             className={navClassFunc}>
                        System Details
                    </NavLink>
                    <NavLink to="processinfo" 
                             className={navClassFunc}>
                        Processes Details
                    </NavLink>
              </div>
              <Outlet className="w-full flex-grow"/>
        </div>

    )
}
