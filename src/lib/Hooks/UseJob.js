"use client"
import { useState } from "react";
import Board from "../models/board.js";
import Column from "../models/column.js";
export function usejob(initialboard) {
    const [board, setboard] = useState()
    const [column, setcolumn] = useState()
    const [error, seterror] = useState()
    async function movejob(jobapplicationId, newcolumnId, neworder) {
        
        
    }
    return {board,column,error,movejob}
}