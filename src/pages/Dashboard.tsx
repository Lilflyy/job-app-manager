import { useEffect, useState } from "react";
import DisplayJobs from "../components/DisplayJobs";
import Layout from "../components/Layout";
import { useAuth } from "../Provider/userContexProvider";
import { Job } from "../components/DisplayJobs";
import { supabase } from "../supabaseConfig/supabase";
const DashBoard = () => {
  const { user, isLoading, logout } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([])
  const [jobLoading, setJobLoading] = useState<boolean>(true)
  const fetchJobs = async () => {
    setJobLoading(true)
    const { data, error } = await supabase
        .from("Jobs") // Table name in Supabase
        .select("*")
    if (error) {
      console.log(error)
      setJobs([])
    
    } else {
      setJobs(data)
    }
    setJobLoading(false)
  }
  useEffect(() => {
    fetchJobs()
  }, [])

  return (
    <Layout>
    <div style={{height:"100%"}}>
      {isLoading ? (
        <p>Loading...</p>
      ) : user ? (
        <div className="dashboard-contents" style={{display:"flex", flexDirection:"row", width:"100%", gap:"10px", height:"100%"}}>
        <div className="dashboard-left" style={{width:"70%"}}>
        <h1>Welcome to your Dashboard {user.displayName}!</h1>
        <DisplayJobs jobs={jobs}/>
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
