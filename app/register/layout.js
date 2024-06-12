import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <div className='{inter.className} w-screen h-screen backdrop-blur-md bg-gradient-to-r from-cyan-500 to-blue-500 justify-center align-middle' style={{"alignContent":"center"}}>
        {children}
    </div>
  );
}
