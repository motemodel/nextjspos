'use client'

import dynamic from "next/dynamic";
import AppLoading from "../../components/AppLoading";
import AppLogo from "../../components/AppLogo";
import Image from "next/image";
import { imageLoader } from "@/utils/loader";

const AppAdsDynamic = dynamic(
  () => import("../../components/AppAds"),
  {
    loading: () => <AppLoading />,
    ssr: false
  }
);


export default function About() {
  return (
    <div className="p-10 bg-green-100 m-10">
      <AppLogo />
      <Image loader={imageLoader}
        src="/0.png" alt="กล่องไปรษณีย์" title="yahoo" width={0} height={0} loading="eager" style={{ width: 200, height: 'auto' }}
      />
      <hr />
      <Image loader={imageLoader}
        src="/profile.jpg" alt="กล่องไปรษณีย์" title="yahoo" width={0} height={0} loading="eager" style={{ width: 200, height: 'auto' }}
      />

      About Page
      <hr />
      <AppAdsDynamic />
      <h1>{process.env.NEXT_PUBLIC_APP_NAME}</h1>
      <h2>{process.env.NEXT_PUBLIC_APP_VERSION}</h2>
    </div>
  );
}
