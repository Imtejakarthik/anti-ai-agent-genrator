import React, { ReactNode } from "react";
import HomeNavbar from "@/components/navigation/homeNavbar";
import Footer from "@/components/navigation/footer";
import SetTheme from "@/components/shared/setTheme";


const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex min-h-screen flex-col">
            <SetTheme theme="dark" />
            <HomeNavbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;

