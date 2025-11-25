"use client";

import { useState, useTransition } from "react";
import { Project } from "@/type";
import { toast } from "sonner";
import { FaAngleLeft } from "react-icons/fa6";
import Link from "next/link";
import { createIssue, deleteIssue } from "@/actions/issue/actions";
import IssueCard from "./issue-card";
import { IssueEmpty } from "./issue-empty";
import IssueCreateForm from "./issue-create-form";

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

    // update issues after successful deletion
    setIssues((prev) => prev.filter((i) => i.id !== id))

    // display success toast
    toast.success(result.data.title + " - Issue Deleted");
  }

  // create a new issue
  async function handleSubmit(formData: FormData) {
    submitTransition(async () => {
      const result = await createIssue({
        projectId: project.id,
        title: formData.get('title') as string,
        status: formData.get('status') as string,
        priority: formData.get('priority') as string,
      })
      // if submission fails, show error in toast
      if (!result.success) {
        toast.error(result.error);
        return;
      }

      // update issues after successful creation
      setIssues((prev) => [...prev, result.data])

      // display success toast
      toast.success(result.data.title + " - Issue Created!");
    })
  }

  return (
    <section className="w-full">

      {/* title & back button */}
      <div className="flex gap-6 items-center mb-4">
	<Link href="/projects">
	  <FaAngleLeft />
	</Link>
	<h1 className="text-xl font-bold">{project.title}</h1>
      </div>

      {/* description */}
      <div>
	<span>{project.description}</span>
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
	<div>
	  {/* create new issue */}
	  <ul className="flex flex-col gap-5 items-center justify-center">
	    {issues.map((issue) => (
	      <IssueCard
		key={issue.id}
		issue={issue}
		onDeleteAction={() => handleDelete(issue.id)}
	      />
	    ))}
	  </ul>
	</div>
      )}
    </section>
    
  )
}
