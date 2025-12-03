'use client'

import dynamic from "next/dynamic";
import AppLoading from "../../components/AppLoading";
import AppLogo from "../../components/AppLogo";

const AppAdsDynamic = dynamic(
  () => import("../../components/AppAds"),
  {
    loading: () => <AppLoading />,
    ssr: false
  }
);


export default function About() {
  return (
    <div className="p-10 bg-green-500 m-10">
      <AppLogo />
      About Page
      <hr />
      <AppAdsDynamic />
    </div>
  );
}
