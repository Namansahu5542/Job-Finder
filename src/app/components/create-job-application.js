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

export default function CreateJobApplication({ columnId, boardId }) {
    const [open, setopen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            aria-label="Create job application"
          />
        }
      >
        <Plus aria-hidden="true" />
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
        <form className="w-full font-(family-name:--font-poppins)">
          <div className="flex w-full flex-col gap-5">
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex min-w-0 flex-col gap-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="e.g. Acme Inc."
                  autoComplete="organization"
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
                  className="h-10 bg-background transition-shadow"
                />
              </div>
              <div className="flex min-w-0 flex-col gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g. Remote or New York"
                  className="h-10 bg-background transition-shadow"
                />
              </div>
            </div>

            <div className="flex w-full flex-col gap-4">
              <div className="flex w-full flex-col gap-2">
                <Label htmlFor="job-url">Job URL</Label>
                <Input
                  id="job-url"
                  name="jobUrl"
                  type="url"
                  placeholder="https://example.com/careers/role"
                  className="h-10 w-full bg-background transition-shadow"
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  name="tags"
                  placeholder="e.g. design, remote, full-time"
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
                  placeholder="Add notes about the role, interview process, or follow-up..."
                  rows={5}
                  className="min-h-32 w-full resize-y bg-background transition-shadow"
                />
              </div>
            </div>

            <DialogFooter className="gap-2 border-t pt-4 sm:justify-end">
              <Button type="button" variant="outline" onClick={()=>setopen(false)} className="transition-colors">
                Cancel
              </Button>
              <Button type="submit" className="transition-colors">
                Add Application
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}