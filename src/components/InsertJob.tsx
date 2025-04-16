import { useState } from "react";
import { supabase } from "../supabaseConfig/supabase";
import { Job } from "./DisplayJobs";
import axios from 'axios';

interface InsertJobProps {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  useLink: boolean;
}

const InsertJob: React.FC<InsertJobProps> = ({ jobs, setJobs, useLink }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobStatus, setJobStatus] = useState("Not Applied");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [jobLink, setJobLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<null | string>(null);

  const handleLinkSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
  
    try {
      const htmlRes = await axios.post("http://localhost:3300/fetch-job", { url: jobLink });
      const html = htmlRes.data.html;
  
      const gptRes = await axios.post("http://localhost:3300/process-job", { html });
      const { jobTitle, companyName, jobDescription } = gptRes.data;
  
      const { data, error } = await supabase
        .from("Jobs")
        .insert({
          job_title: jobTitle,
          company_name: companyName,
          job_status: jobStatus,
          job_description: jobDescription,
        })
        .select()
        .single();
  
      if (error) {
        setMessage(error.message);
      } else {
        if (data) {
          setJobs([data, ...jobs]);
        }
        setMessage("Successfully added the job!");
        setJobTitle(jobTitle);
        setCompanyName(companyName);
        setJobDescription(jobDescription);
      }
  
      setLoading(false);
    } catch (e) {
      console.error(e);
      setMessage("Error: failed to process the job link or insert data");
      setLoading(false);
    }
  };
  

  return (
    <div className="insert-job-container">
      <h2>Add a New Job Application</h2>
      {message && (
        <p className={message.includes("Successfully") ? "success" : "error"}>
          {message}
        </p>
      )}

      
        {useLink ? (
          <form onSubmit={handleLinkSubmit} className="insertForm">
            <div>
              <label>Job Posting URL:</label>
              <input
                type="url"
                value={jobLink}
                onChange={(e) => setJobLink(e.target.value)}
                required
              />
            </div>

            {/* You can trigger GPT summarization using this URL later */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>Extracted Description (editable):</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={4}
                placeholder="Paste job description or let GPT fill this from the link"
              />
            </div>
            <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Add Job"}
        </button>
          </form>
        ) : (
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
              <select
                value={jobStatus}
                onChange={(e) => setJobStatus(e.target.value)}
              >
                <option value="Not Applied">Not Applied</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offered">Offered</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
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
        )}

        
      
    </div>
  );
};

export default InsertJob;
