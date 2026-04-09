import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "mealapp",
    description: "Explore recipes by ingredients using TheMealDB API",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${montserrat.variable} ${inter.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col bg-white font-sans">
                <Navbar />
                <main className="flex-1">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {children}
                    </div>
                </main>
            </body>
        </html>
    );
}
