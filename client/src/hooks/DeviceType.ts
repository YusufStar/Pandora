"use client"
import {useEffect, useState} from "react";

type DeviceType = "mobile" | "tablet" | "desktop";

interface DeviceStatus {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}

function useDeviceType(): DeviceStatus {
    const [deviceType, setDeviceType] = useState<DeviceType | null>(null);

    useEffect(() => {
        function handleResize() {
            const {innerWidth} = window;
            if (innerWidth < 768) {
                setDeviceType("mobile");
            } else if (innerWidth >= 768 && innerWidth < 1024) {
                setDeviceType("tablet");
            } else {
                setDeviceType("desktop");
            }
        }

        handleResize(); // initial check
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const deviceStatus: DeviceStatus = {
        isMobile: deviceType === "mobile",
        isTablet: deviceType === "tablet",
        isDesktop: deviceType === "desktop",
    };

    return deviceStatus;
}

export default useDeviceType;