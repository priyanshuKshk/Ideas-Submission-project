import React from "react";

import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
    return (
        <div>
            <Header />
            
            <main className="px-4 min-h-[calc(100% - 70px)] w-full">
                <Outlet />
            </main>  
            
            <Footer />
        </div>
    );
}
