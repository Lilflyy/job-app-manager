import { useState } from "react";
import { supabase } from "../supabaseConfig/supabase";
import { Job } from "./DisplayJobs";
interface InsertJobProps {
    jobs: Job[];
    setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  }
const InsertJob:React.FC<InsertJobProps> = ({jobs, setJobs}) => {
    const [jobTitle, setJobTitle] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [jobStatus, setJobStatus] = useState("Not Applied"); // Default status
    const [jobDescription, setJobDescription] = useState<string>("")
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<null | string>(null)
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true)
        setMessage(null)

        const { data, error } = await supabase
        .from('Jobs')
        .insert({ job_title:jobTitle,
                company_name: companyName,
                job_status: jobStatus,
                job_description: jobDescription
         }).select().single()

         if (error) {
            setMessage(error.message)
         } else {
            if (data) {
                setJobs([data, ...jobs]);
            }
            
            setMessage("Successfully added the job!")
         }

         setLoading(false)
    }
    return ( 
        <div className="insert-job-container">
      <h2>Add a New Job Application</h2>
      {message && <p className={message.includes("Successfully") ? "success" : "error"}>{message}</p>}

      <form onSubmit={handleSubmit} className="insertForm">
        <div>
          <label>Job Title:</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Company Name:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Job Status:</label>
          <select value={jobStatus} onChange={(e) => setJobStatus(e.target.value)}>
            <option value="Not Applied">Not Applied</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offered">Offered</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div style={{display:"flex", flexDirection:"column"}}>
          <label>Job Description:</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={4}
            placeholder="Enter job details, responsibilities, salary, etc."
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Add Job"}
        </button>
      </form>
    </div>

    );
}
 
export default InsertJob;