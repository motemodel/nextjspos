import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/navbar";

const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["thai"],
  display: "swap",
  preload: true,
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});


export const metadata: Metadata = {
  title: "กล่องพัสดุ ไปรษณีย์ กระดาษลูกฟูก ส่งสินค้า",
  description: "ขายส่ง ปลีก แบ่งขาย ลาดพร้าว วังหิน โชคชัย4 นาคนิวาส สังคมสงเคราะห์ เสือใหญ่ สะพานสอง สตรีวิทยา 2"
};

export default function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${prompt.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
