export interface Job {
    id: string;
    job_title:string;
    company_name: string;
    created_at: string;
    user_id: string;
    job_status:string;
}

interface DisplayJobsProps {
    jobs: Job[]
}

const DisplayJobs:React.FC<DisplayJobsProps> = ({jobs}) => {
    return ( 
        <div className="job-list">
        <h2>Job Applications</h2>
        {jobs.length === 0 ? (
          <p>No job applications found.</p>
        ) : (
          <ul>
            {jobs.map((job) => (
              <li key={job.id} className="job-item">
                <h3>{job.job_title}</h3>
                <p><strong>Company:</strong> {job.company_name}</p>
                <p><strong>Job Status: {job.job_status}</strong></p>
                <p><strong>Job added on:</strong> {new Date(job.created_at).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
     );
}
 
export default DisplayJobs;