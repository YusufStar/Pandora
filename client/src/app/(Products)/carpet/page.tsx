import dynamic from "next/dynamic";

const CarpetContainer = dynamic(() => import("@/containers/carpet/CarpetContainer"), { ssr: false })

const Page = async () => {
  return <CarpetContainer />;
};

export default Page;
