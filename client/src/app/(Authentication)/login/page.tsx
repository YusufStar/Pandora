"use client"

import {Input} from "@/components/ui/input";
import {Label} from "@radix-ui/react-label";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import React, {useState} from "react";
import {Loader2} from "lucide-react";
import {toast} from "sonner";
import {signIn} from 'next-auth/react';
import {useRouter} from 'next/navigation';

const RegisterPage = () => {
    const {push} = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState({
        email: null,
        password: null
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError({
            email: null,
            password: null
        })
        setLoading(true)

        try {
            const response = await signIn("credentials", {
                redirect: true,
                callbackUrl: "/carpet",
                email: data.email,
                password: data.password
            })

            if (response?.ok) {
                toast.success("successfully logged in");
            }

        } catch (error: any) {
            setLoading(false)
        }
    }

    return (
        <div className={"h-screen w-sc flex items-center justify-center"}>
            <Link href={"/carpet"}>
                <Image
                    src="/images/logo.png"
                    width={150}
                    height={30.47}
                    quality={100}
                    alt="logo"
                    decoding="async"
                    draggable="false"
                    className="w-[120px] lg:w-[150px] absolute left-8 top-8"
                />
            </Link>

            <form className={"max-w-md mx-auto p-8 sm:p-0 flex flex-col gap-4 w-full h-fit"} onSubmit={handleSubmit}>
                <span className={"mb-4 text-4xl mx-auto font-medium"}>Sign in</span>

                <div className={"flex flex-col w-full gap-1"}>
                    <Label htmlFor="usernameOrEmail">Email</Label>
                    <Input
                        value={data.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setData((prev) => ({...prev, [e.target.name]: e.target.value}));
                        }}
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email"
                    />
                    {error.email && (
                        <span className="text-red-500 text-xs font-medium">
                            {error.email}
                        </span>
                    )}
                </div>

                <div className={"flex flex-col w-full gap-1"}>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        value={data.password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setData((prev) => ({...prev, [e.target.name]: e.target.value}));
                        }}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Your password"
                    />
                    {error.password && (
                        <span className="text-red-500 text-xs font-medium">
                            {error.password}
                        </span>
                    )}
                </div>

                <Link href={"/register"} className="flex cursor-pointer items-center w-full">
                    <div className="w-full border"></div>
                    <span className={"text-nowrap px-3 text-sm"}>or sign up</span>
                    <div className="w-full border"></div>
                </Link>

                <Button disabled={loading} type="submit">
                    {!loading ? "Login" : <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                </Button>
            </form>
        </div>
    )
}

export default RegisterPage