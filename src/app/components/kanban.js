import { Award, Calendar, CheckCircle, Mic, XCircle } from "lucide-react";
import CreateJobApplication from "./create-job-application";

const def_Cards = [
  {
    color: "#ffffff",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    color: "#dadde2",
    icon: <CheckCircle className="h-4 w-4" />,
  },
  {
    color: "#b1bdc5",
    icon: <Mic className="h-4 w-4" />,
  },
  {
    color: "#889fa5",
    icon: <Award className="h-4 w-4" />,
  },
  {
    color: "#628281",
    icon: <XCircle className="h-4 w-4" />,
  },
];

export default function KanbanBoard({ boardget }) {
  return (
    <section className="w-full">
      <div className="flex w-full gap-1 overflow-x-auto mt-4 pb-4">
        {def_Cards.map((config, index) => {
          const column = boardget.columns[index];

          return (
            <article
              key={column._id}
              className="block min-h-100 min-w-44 flex-1 rounded-2xl rounded-base border border-default p-4 shadow-xs"
              style={{ backgroundColor: config.color }}
            >
              <div className="flex items-center gap-2 text-gray-900">
                {config.icon}
                <h3 className="font-semibold">{column.name}</h3>
              </div>
              <CreateJobApplication
                columnId={column._id}
                boardId={boardget.userid}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
