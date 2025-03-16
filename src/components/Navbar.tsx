import { useAuth } from "../Provider/userContexProvider";
import { supabase } from "../supabaseConfig/supabase";
const Navbar = () => {
    const { user, isLoading, logout } = useAuth()
    const signOut = async () => {
        const { error } = await supabase.auth.signOut()

    }
    return (
        <nav className="navbar">
            <h1>Job Application Manger</h1>
            <div className="links">
                <a href='#/dashboard'>Dashboard</a>
                {user && <a onClick={signOut}>sign out</a>}
            </div>

        </nav>

    );
}
 
export default Navbar;