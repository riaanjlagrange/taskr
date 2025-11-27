"use client";

import { useState, useTransition } from "react";
import { Project } from "@/type";
import { toast } from "sonner";
import { FaAngleLeft } from "react-icons/fa6";
import Link from "next/link";
import { createIssue, deleteIssue, updateIssue } from "@/actions/issue/actions";
import IssueCard from "./issue-card";
import { IssueEmpty } from "./issue-empty";
import IssueCreateForm from "./issue-create-form";
import { filterIssuesByStatus, sortByDate, updateItemInList } from "@/lib/utils";
import { Button } from "./ui/button";
import { IconEdit } from "@tabler/icons-react";
import { Accordion, AccordionContent, AccordionTrigger } from "@radix-ui/react-accordion";
import { AccordionItem } from "./ui/accordion";
import { ChevronDown } from "lucide-react";

// get initial projects from server
export default function ProjectView({ project }: { project: Project}) {
  const [isPendingSubmit, submitTransition] = useTransition();
  const [issues, setIssues] = useState(project.issues || [])

  // delete an issue
  const handleDelete = async (id: number) => {
    const result = await deleteIssue(id);

    // if deletion fails, show error in toast
    if (!result.success) {
      toast.error(result.error);
      return;
    }

    // update & sort issues after successful deletion
    setIssues((prev) => sortByDate(prev.filter((i) => i.id !== id), "updatedAt"));

    // display success toast
    toast.success(result.data.title + " - Issue Deleted");
  }

  // update issues status (open / closed)
  const handleUpdateStatus = async (id: number, status: string) => {
    const result = await updateIssue({
      issueId: id,
      status: status
    });

    // if update fails, show error in toast
    if (!result.success) {
      toast.error(result.error);
      return;
    }

    // update & sort issues after successful deletion
    setIssues((prev) => updateItemInList(prev, id, { status: status }));

    // display success toast
    if (status == "open") {
      toast.success(result.data.title + " - Issue Re-opened");
    } else {
      toast.success(result.data.title + " - Issue Closed");
    }
  }

  // create a new issue
  async function handleSubmit(formData: FormData) {
    submitTransition(async () => {
      const result = await createIssue({
        projectId: project.id,
        title: formData.get('title') as string,
        status: "open", // set issue as open by default
        priority: formData.get('priority') as string,
      })
      // if submission fails, show error in toast
      if (!result.success) {
        toast.error(result.error);
        return;
      }

      // update & sort issues after successful creation
      setIssues((prev) => sortByDate([...prev, result.data], "updatedAt"));

      // display success toast
      toast.success(result.data.title + " - Issue Created!");
    })
  }

  return (
    <section className="w-full">

      {/* project details and action buttons */}
      <div className="flex justify-between mb-4">
	<div className="flex gap-6 items-center">
	  <Link href="/projects">
	    <FaAngleLeft />
	  </Link>
	  <h1 className="text-xl font-bold">{project.title}</h1>
	</div>
	<Link href={`/project/${project.id}/update`}>
	  <Button variant="outline" size="sm">
	    <IconEdit />
	  </Button>
	</Link>
      </div>

      {/* description */}
      <div>
	<h2 className="text-md text-zinc-500">Description</h2>
	<span className="ml-4">{project.description}</span>
      </div>

      <div className="my-5 w-full flex justify-center">
	<IssueCreateForm
	  onSubmitAction={handleSubmit}
	  isPendingSubmit={isPendingSubmit}
	/>
      </div>
      
      {/* display this if there are no issues in this project */}
      {!issues || issues.length === 0 ? (
	<IssueEmpty />
      ): (
      // otherwise display this
	<Accordion
	    type="single"
	    collapsible
	    className="w-full"
	    defaultValue="status-open"
	>
	  <AccordionItem value="status-open">
	    <AccordionTrigger className="mb-4 flex justify-center items-center gap-2 cursor-pointer [&[data-state=open]>svg]:rotate-180">
	      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-300" />
	      <span>Open Issues {filterIssuesByStatus(issues, "open").length !== 0 && '( ' + filterIssuesByStatus(issues, "open").length + ' )'}</span>
	    </AccordionTrigger>
	    <AccordionContent className="text-balance">
	      <ul className="flex flex-col gap-5 items-center justify-center">
		{filterIssuesByStatus(sortByDate(issues, "updatedAt"), "open").map((issue) => ( <IssueCard
		    key={issue.id}
		    issue={issue}
		    onDeleteAction={handleDelete}
		    onUpdateStatusAction={handleUpdateStatus}
		  />
		))}
	      </ul>
	    </AccordionContent>
	    </AccordionItem>
	  <AccordionItem value="status-closed">
	    <AccordionTrigger className="my-4 flex justify-center items-center gap-2 cursor-pointer [&[data-state=open]>svg]:rotate-180">
	      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-300" />
	      <span>Closed Issues {filterIssuesByStatus(issues, "closed").length !== 0 && '( ' + filterIssuesByStatus(issues, "closed").length + ' )'}</span>
	    </AccordionTrigger>
	    <AccordionContent className="text-balance mb-4">
	      <ul className="flex flex-col gap-5 items-center justify-center">
		{filterIssuesByStatus(sortByDate(issues, "updatedAt"), "closed").map((issue) => ( <IssueCard
		    key={issue.id}
		    issue={issue}
		    onDeleteAction={handleDelete}
		    onUpdateStatusAction={handleUpdateStatus}
		  />
		))}
	      </ul>
	    </AccordionContent>
	  </AccordionItem>
	</Accordion>
      )}
    </section>
    
  )
}
