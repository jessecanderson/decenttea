import { ReactNode } from "react";
import { AddressProvider } from "../context/addressprovider";
import Navbar from "./navbar";

export default function Layout({children}: React.PropsWithChildren<{}>) { 
    return (
        <>
            <AddressProvider>
            <Navbar />
            <main>{children}</main>
            </AddressProvider>
        </>
    )
}