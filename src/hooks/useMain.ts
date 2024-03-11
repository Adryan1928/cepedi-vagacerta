import React, { useContext } from "react";
import { MainContext } from "../contexts/main";

export function useMain(){
    return useContext(MainContext)
}