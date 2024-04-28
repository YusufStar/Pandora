"use client"
import React, {useEffect} from "react";
import {redirect} from "next/navigation";

const Page = () => {
useEffect(() => {
    redirect("/carpet")
} , [])

    return <></>
};

export default Page;