"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import  createjobapplication  from "@/lib/createjobapplication"
const INITIAL_FORM_DATA = {
  company: "",
  position: "",
  salary: "",
  location: "",
  jobUrl: "",
 
  tags: "",
  notes: "",
  description: "",
}
export default function CreateJobApplication({ columnId, boardId }) {
  
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formdata, setFormdata] = useState({ ...INITIAL_FORM_DATA });

  async function handlesubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const result = await createjobapplication({
        data: {
          ...formdata,
          boardId,
          columnid: columnId,
          tags: formdata.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 1),
        },
      });
      if (!result.error) {
        console.log(result.message);
        setFormdata({ ...INITIAL_FORM_DATA });
        setOpen(false);
      } else {
        setError(result.error);
      }
    } catch (submitError) {
      setError(submitError.message || "Unable to save the job application.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (nextOpen) setError("");
      }}
    >
      <DialogTrigger className="mt-2"
        render={
          <Button
            variant="outline"
            size="icon"
            aria-label="Create job application"
          />
        }
      >
        <Plus  aria-hidden="true" />
       
      </DialogTrigger>
      <DialogContent
        className="max-h-[90vh] overflow-y-auto p-6 sm:max-w-xl"
        data-column-id={columnId}
        data-board-id={boardId}
      >
        <div className="space-y-1 pr-8">
          <DialogTitle className="text-lg">Create job application</DialogTitle>
          <DialogDescription>
            Add the key details for this opportunity. You can update them later.
          </DialogDescription>
        </div>
        <form onSubmit={handlesubmit} className="w-full font-(family-name:--font-poppins)">
          <div className="flex w-full flex-col gap-5">
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex min-w-0 flex-col gap-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="e.g. Acme Inc."
                  autoComplete="organization"
                  value={formdata.company}
                  onChange={(e) => setFormdata({ ...formdata, company: e.target.value })}
                  required
                  className="h-10 bg-background transition-shadow"
                />
              </div>
              <div className="flex min-w-0 flex-col gap-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  name="position"
                  placeholder="e.g. Product Designer"
                  autoComplete="organization-title"
                  value={formdata.position}
                  onChange={(e) => setFormdata({ ...formdata, position: e.target.value })}
                  required
                  className="h-10 bg-background transition-shadow"
                />
              </div>
              <div className="flex min-w-0 flex-col gap-2">
                <Label htmlFor="salary">Salary</Label>
                <Input
                  id="salary"
                  name="salary"
                  placeholder="e.g. $120,000"
                  value={formdata.salary}
                  required
                  onChange={(e) => setFormdata({ ...formdata, salary: e.target.value })}
                  className="h-10 bg-background transition-shadow"
                />
              </div>
              <div className="flex min-w-0 flex-col gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formdata.location}
                  required
                  onChange={(e) => setFormdata({ ...formdata, location: e.target.value })}
                  placeholder="e.g. Remote or New York"
                  className="h-10 bg-background transition-shadow"
                />
              </div>
            </div>

            <div className="flex w-full flex-col gap-4">
              <div className="flex w-full flex-col gap-2">
                <Label htmlFor="jobUrl">Job URL</Label>
                <Input
                  id="jobUrl"
                  name="jobUrl"
                  type="url"
                  required
                  value={formdata.jobUrl}
                  onChange={(e) => setFormdata({ ...formdata, jobUrl: e.target.value })}
                  placeholder="https://example.com/careers/role"
                  className="h-10 w-full bg-background transition-shadow"
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <Label htmlFor="jobUrl">notes</Label>
                <Input
                  id="notes"
                  name="notes"


                  value={formdata.notes}
                  onChange={(e) => setFormdata({ ...formdata, notes: e.target.value })}
                  placeholder=""
                  className="h-10 w-full bg-background transition-shadow"
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  name="tags"
                  placeholder="e.g. design, remote, full-time"
                  value={formdata.tags}
                  required
                  onChange={(e) => setFormdata({ ...formdata, tags: e.target.value })}
                  className="h-10 w-full bg-background transition-shadow"
                />
                <p className="text-xs text-muted-foreground">
                  Separate tags with commas.
                </p>
              </div>
              <div className="flex w-full flex-col gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formdata.description}
                  required
                  onChange={(e) => setFormdata({ ...formdata, description: e.target.value })}
                  placeholder="Add notes about the role, interview process, or follow-up..."
                  rows={5}
                  className="min-h-32 w-full resize-y bg-background transition-shadow"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}

            <DialogFooter className="gap-2 border-t pt-4 sm:justify-end">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} className="transition-colors">
                Cancel
              </Button>
              <Button type="submit" disabled={submitting} className="transition-colors">
                {submitting ? "Adding..." : "Add Application"}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}