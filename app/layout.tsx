import { ReactNode } from "react";
import Navbar from "../components/navbar";

// Root layout (app/layout.js)
// - Applies to all routes
export default function RootLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <html>
      <body>
        {/* <Header /> */}
        <Navbar />
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
