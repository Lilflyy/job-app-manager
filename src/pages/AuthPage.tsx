import { useState } from "react";
import Layout from "../components/Layout";
import Login from "../components/Login";
import SignUp from "../components/Signup";

const AuthPage = () => {
    const [login, SetLogin] = useState<boolean>(true)

    return (
    
        <Layout>

            <div style={{display:"flex",flexDirection: "column", alignItems:"center", width:"100%"}}>

                <div><h1>Please Login or Sign up here</h1></div>
                

                   {login ? <div><Login/> <p> Don't have an account? <a onClick={() => {SetLogin(false)}}>Sign up here! </a></p></div> :
                   <div>
                   <SignUp/>
                   <p>Already have an account? <a onClick={() => {SetLogin(true)}}>Log in here!</a></p>
                   </div>}

            </div>
        </Layout>


    );
}
 
export default AuthPage;