import React from "react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const Page = async () => {
  const session = await getServerSession(authOptions)

  return <main>
<h2>Server Session</h2>
    <pre>{JSON.stringify(session)}</pre>
  </main>;
};

export default Page;