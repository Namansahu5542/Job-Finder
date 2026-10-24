import { Award, Calendar, CheckCircle, Mic, XCircle } from "lucide-react";
import CreateJobApplication from "./create-job-application";
import SortedJobApplications from "@/lib/jobApplication";

const def_Cards = [
  { color: "#1f2937", icon: <Calendar className="h-4 w-4" /> },    // gray-800
  { color: "#273443", icon: <CheckCircle className="h-4 w-4" /> }, // slate-blue
  { color: "#2c4150", icon: <Mic className="h-4 w-4" /> },         // steel blue
  { color: "#2a4d4f", icon: <Award className="h-4 w-4" /> },       // dark teal
  { color: "#3b2f35", icon: <XCircle className="h-4 w-4" /> },     // muted maroon
];
function JobCard({ job, columns }) {
  return (
    <SortedJobApplications job={job} columns={columns} />
  );
}

function sortedJobApplication(applications = []) {
  return [...applications].sort((a, b) => a.order - b.order);
}

export default function KanbanBoard({ boardget }) {
  return (
    <section className="w-full">
      <div className="flex w-full gap-1 overflow-x-auto mt-4 pb-4">
        {def_Cards.map((config, index) => {
          const column = boardget.columns[index];
          if (!column) return null;

          return (
            <article
              key={column._id}
              className="block min-h-100 min-w-44 flex-1 rounded-2xl rounded-base border border-default p-4 shadow-xs"
              style={{ backgroundColor: config.color }}
            >
              <div className="flex items-center gap-2 text-white">
                {config.icon}
                <h3 className="font-semibold">{column.name}</h3>
              </div>
              <div className="mt-4 flex flex-col gap-3">
                {sortedJobApplication(column.job_applications || []).map((job) => (
                  <JobCard key={job._id} job={job} columns={boardget.columns} />
                ))}
              </div>
              <CreateJobApplication
                columnId={column._id}
                boardId={boardget._id}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
