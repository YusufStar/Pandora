'use client'
import React, {ReactNode, useEffect, useState} from "react";
import {Loader2} from "lucide-react";
import {SessionProvider} from "next-auth/react";

const LoadingContainer = ({children}: { children: ReactNode | ReactNode[] }) => {
    const [loadedClient, setLoadedClient] = useState<boolean>(false)

    useEffect(() => {
        if (window !== undefined) {
            setLoadedClient(true);
            // const delay = () => new Promise(resolve => setTimeout(resolve, 500));

            // delay().then(() => {
            // setLoadedClient(true);
            // });
        }
    }, [])

    return (
        <SessionProvider>
            {loadedClient ? children : (
                <div className={'h-screen max-h-screen overflow-hidden flex items-center justify-center'}>
                    <Loader2 className="h-8 w-8 animate-spin"/>
                </div>
            )}
        </SessionProvider>
    )
}

export default LoadingContainer;