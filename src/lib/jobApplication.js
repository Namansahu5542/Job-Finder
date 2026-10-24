
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit2, ExternalLink, MoreVertical, Trash2 } from "lucide-react";

export default function SortedJobApplications({ job, columns = [] }) {
    return (
        <Card className="border-white/10 bg-fuchsia-50 font-(family-name:--font-poppins) text-black">
            <CardContent className="space-y-1 p-4">
                <div className="flex justify-between items-center">  <h4 className=""><b>company : </b>{`${job.company} `}</h4>
                    <section>
                        <DropdownMenu>
                            <DropdownMenuTrigger aria-label="Application actions" className="rounded p-1 hover:bg-black/10">
                                <MoreVertical className="h-4 w-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className=" font-sans   bg-fuchsia-100 text-black" align="end">
                                <DropdownMenuItem >
                                    <Edit2 />
                                    Edit
                                </DropdownMenuItem>
                                {columns.length > 1 &&
                                    columns
                                        .filter((col) => String(col._id) !== String(job.columnId))
                                        .map((targetColumn) => (
                                            <DropdownMenuItem  key={targetColumn._id}>
                                                Move to {targetColumn.name}
                                            </DropdownMenuItem>
                                        ))}
                                        <DropdownMenuItem><Trash2/>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </section>
                </div>
                <p className="text-sm text-gray-900"><b>position : </b>{job.position}</p>


                <p className="text-sm text-gray-900"><b>location : </b>{job.location}</p>
                {job.salary && <p className="text-sm text-gray-900"><b>salary : </b>{job.salary}</p>}
                <div>{job.tags && job.tags.length > 0 && (
                    <>
                        {
                            job.tags.map((tag) => (
                                <span key={tag} className="mr-1 inline-block rounded bg-cyan-100 px-2 py-0.5 text-xs">
                                    {tag}
                                </span>
                            ))
                        }
                    </>
                )}
                    <div>
                        {job.jobUrl && (
                            <>
                                <a href={`${job.jobUrl}`}><ExternalLink /></a>
                            </>
                        )}
                    </div>

                </div>
            </CardContent>
        </Card>
    );
}
