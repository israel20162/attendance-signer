'use client'

import AccessDeniedMessage from "@/app/components/error"


export function AccessDenied(){
    if (!sessionStorage.getItem('courseRepToken')) {
        return (
            <AccessDeniedMessage />
        )
    }
}