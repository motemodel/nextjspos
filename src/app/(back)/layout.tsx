import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Dashboard POS",
    description: "ขายส่ง ปลีก แบ่งขาย ลาดพร้าว วังหิน โชคชัย4 นาคนิวาส สังคมสงเคราะห์ เสือใหญ่ สะพานสอง สตรีวิทยา 2"
};

export default function BackLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="th">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <h1>Dashboard POS YIM</h1>
                <hr />
                {children}
            </body>
        </html>
    );
}
