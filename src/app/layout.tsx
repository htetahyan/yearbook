import "~/styles/globals.css";

import localFont from "next/font/local";
import { Toaster } from "sonner";
import Providers from "./_components/providers/ReactQueryClient";


const juma=localFont({
  src: '../../public/fonts/juma.ttf',
  variable:'--font-juma',
  preload: true
})
const rogBold=localFont({
  src: '../../public/fonts/rogbold.otf',
  variable:'--font-rog-bold',
  preload: true
})
export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <Providers>
    <html lang="en">
      <body className={` ${juma.variable} ${rogBold.variable}
      font-primary bg-fixed
bg-gradient-to-br from-[#2e026d] via-[#0e1129] to-[#2e026d]
text-white
min-h-screen
      `}>
             <Toaster
             richColors
 position="top-center"
 closeButton
toastOptions={{

style:{

  backdropFilter:"blur(20px)",
 background:'transparent',

color:'white'
}
}}
/>
      {children}</body>
    </html>
    </Providers>
  );
}
