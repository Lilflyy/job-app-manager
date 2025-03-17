import { useReducer, useState, useEffect } from "react";

export interface Job {
  id: string;
  job_title: string;
  job_description: string;
  company_name: string;
  created_at: string;
  job_status: string;
}

interface DisplayJobsProps {
  jobs: Job[];
}

interface PaginationState {
  starting_index: number;
  ending_index: number;
}

interface PaginationAction {
  type: string;
  index: number;
}

const jobs_per_page = 4;
const initialState = { starting_index: 0, ending_index: jobs_per_page - 1 };

function reducer(state: PaginationState, action: PaginationAction) {
  switch (action.type) {
    case "SWITCH":
      const start = action.index * jobs_per_page;
      const end = start + jobs_per_page - 1;
      return { starting_index: start, ending_index: end };
    default:
      return state;
  }
}

const DisplayJobs: React.FC<DisplayJobsProps> = ({ jobs }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [jobsFiltered, setJobsFiltered] = useState<Job[]>([]);
  const [selectedPage, setSelectedPage] = useState(0);

  // Compute `page_numbers` 
  const max_pages = Math.ceil(jobs.length / jobs_per_page);
  const page_numbers = [...Array(max_pages).keys()];

  // Update filtered jobs when state changes
  useEffect(() => {
    const fil_jobs = jobs.slice(state.starting_index, state.ending_index + 1);
    setJobsFiltered(fil_jobs);
  }, [state, jobs]); // depend on `jobs` to ensure updates

  const job_page = (page_number: number) => {
    dispatch({ type: "SWITCH", index: page_number });
  };

  return (
    <div className="job-list">
      <h2>Job Applications</h2>
      {jobs.length === 0 ? (
        <p>No job applications found.</p>
      ) : (
        <ul>
          {jobsFiltered.map((job) => (
            <li key={job.id} className="job-item">
              <h3>{job.job_title}</h3>
              <p><strong>Company:</strong> {job.company_name}</p>
              <p><strong>Job Status:</strong> {job.job_status}</p>
              <p><strong>Job added on:</strong> {new Date(job.created_at).toLocaleDateString()}</p>
              <p><strong>Job Description:</strong> {job.job_description}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop:"20px",
        
      }}>
        <ul style={{
          display: "flex",
          listStyle: "none",
          padding: 0,
          margin: 0,
          gap: "10px"
        }}>
          {page_numbers.map((num) => (
            <li
              key={num}
              className="page-item"
              style={{ backgroundColor: selectedPage === num ? "#e8eae9" : "white", cursor: "pointer", padding: "5px 10px", border: "1px solid #ddd" }}
              onClick={() => {
                setSelectedPage(num);
                job_page(num);
              }}
            >
              {num + 1} 
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DisplayJobs;
