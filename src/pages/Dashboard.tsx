import Layout from "../components/Layout";
import { useAuth } from "../Provider/userContexProvider";
const DashBoard = () => {
  const { user, isLoading, logout } = useAuth();


  return (
    <Layout>
    <div style={{height:"100%"}}>
      {isLoading ? (
        <p>Loading...</p>
      ) : user ? (
        <div className="dashboard-contents" style={{display:"flex", flexDirection:"row", width:"100%", gap:"10px", height:"100%"}}>
        <div className="dashboard-left" style={{width:"70%"}}>
        <h1>Welcome to your Dashboard {user.displayName}!</h1>
        </div>
        <div className="dashboard-right" style={{width:"30%", display:"flex", flexDirection:"column", alignItems: "center",
             justifyContent:"center",
             gap:"10px"
             }}>
          <div className="dashboard-options"><p>Add a Job</p></div>
          <div className="dashboard-options"><p>Add Job via links</p></div>
          <div className="dashboard-options"><p>Delete jobs</p></div>
        </div>
        </div>
        
      ) : (
        <p> <a href='#/'>Please Log in / Sign up first </a></p>


      )}
    </div>
    </Layout>
  );
};

export default DashBoard;
