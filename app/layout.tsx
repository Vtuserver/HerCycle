import "./globals.css"; import Nav from "@/components/Nav";
export const metadata={title:"HerCycle | Menstrual Health Tracker",description:"A private menstrual cycle tracking companion."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Nav/>{children}<footer className="footer">HerCycle • Your data, your cycle, your privacy. Not a substitute for professional medical care.</footer></body></html>}
