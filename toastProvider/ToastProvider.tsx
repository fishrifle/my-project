'use client'
import "react-toastify/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import { FC, ReactNode } from "react"

interface ToastProviderProps {
    children: ReactNode,
}

export const ToastProvider:FC<ToastProviderProps> = ({children}) => {
    return (
        <>
        {children}
        <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        />
        </>

    )
}