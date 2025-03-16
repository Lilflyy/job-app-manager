import { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}
const Layout:React.FC<LayoutProps> = ({children}) => {
    return ( 
        
        <div style={{height:"100%"}}>
            <Navbar/>
            <main style={{height:"80%"}}>
                {children}
            </main>
        </div>
     );
}
 
export default Layout;