'use client'
import React, {ReactNode, useEffect, useState} from "react";
import {Loader2} from "lucide-react";

const LoadingContainer = ({children}: {children: ReactNode | ReactNode[]}) => {
    const [loadedClient, setLoadedClient] = useState<boolean>(false)

    useEffect(() => {
        if (window !== undefined) {
            const delay = () => new Promise(resolve => setTimeout(resolve, 1000));

            delay().then(() => {
                setLoadedClient(true);
            });
        }
    }, [window])

    if (loadedClient) {
        return children
    } else {
        return (
            <div className={'h-screen max-h-screen overflow-hidden flex items-center justify-center'}>
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }
}

export default LoadingContainer;