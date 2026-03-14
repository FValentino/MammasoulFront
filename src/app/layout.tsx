import type { Metadata } from "next";
import { ReactNode } from "react";
import '@/styles/App.css'
import Providers from "@/components/Providers";
import Menu from "@/components/menu/Menu";
import ShoppingCart from "../components/shoppingCart/ShoppingCart";

interface Props{
  children: ReactNode;
}


export const metadata: Metadata = {
  title: "Mammasoul",
  description: "Tienda online Mammasoul",
  icons: {
    icon: "/logoM.png", 
  },
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" translate="no">
      <body>
        <Providers>
          <Menu />
          <div id="root" className="scroll-smooth">
            {children}
          </div>

          <ShoppingCart />
        </Providers>
      </body>
    </html>
  );
}